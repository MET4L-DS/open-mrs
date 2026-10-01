"""
Concept & Form Relationship Analyzer using Python-iGraph and Gravis.

Analyzes OpenMRS concept dictionary, AMPATH form schemas, and skip-logic expressions:
- Builds a directed graph of Forms, Question Concepts, Answer Concepts, and Skip Logic conditions
- Detects orphaned concepts and external/CIEL concept references
- Detects circular dependencies (cycles) in conditional branching
- Computes form complexity metrics and cross-form variable reuse
- Exports interactive HTML visualizations (Full Network + Skip-Logic-only Network) via Gravis
"""

import csv
import glob
import json
import os
import re
import sys
from collections import defaultdict
import igraph as ig

try:
    import gravis as gv
    HAS_GRAVIS = True
except Exception as e:
    HAS_GRAVIS = False
    print(f"[Warning] gravis could not be imported ({e}). HTML export will be skipped.")

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CONCEPTS_CSV = os.path.join(PROJECT_ROOT, "configuration", "concepts", "aiims", "aiims_concepts.csv")
FORMS_DIR = os.path.join(PROJECT_ROOT, "forms")
DOCS_DIR = os.path.join(PROJECT_ROOT, "docs")


def load_concepts_csv(csv_path):
    """Loads concept universe from CSV."""
    concepts = {}
    if not os.path.exists(csv_path):
        print(f"[Error] Concepts CSV not found at: {csv_path}")
        return concepts

    with open(csv_path, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            uuid = row.get("Uuid", "").strip()
            if not uuid:
                continue
            name = (
                row.get("Fully specified name:en", "").strip()
                or row.get("Short name:en", "").strip()
                or uuid
            )
            data_class = row.get("Data class", "").strip()
            datatype = row.get("Data Type", "").strip()
            answers_raw = row.get("Answers", "").strip()
            answers = [a.strip() for a in answers_raw.split(";") if a.strip()]

            concepts[uuid] = {
                "uuid": uuid,
                "name": name,
                "class": data_class,
                "datatype": datatype,
                "answers": answers,
            }
    return concepts


def extract_questions_from_form(form_json):
    """Recursively traverses AMPATH JSON structure to extract all question objects."""
    questions = []

    def _traverse(node):
        if isinstance(node, dict):
            if "questionOptions" in node or "type" in node and node.get("type") == "obs":
                questions.append(node)
            for k, v in node.items():
                if k in ("pages", "sections", "questions") and isinstance(v, list):
                    for item in v:
                        _traverse(item)
        elif isinstance(node, list):
            for item in node:
                _traverse(item)

    _traverse(form_json)
    return questions


def extract_dependencies_from_expr(expr, known_question_ids):
    """Extracts question IDs referenced in a hideWhenExpression."""
    if not expr or not isinstance(expr, str):
        return []

    tokens = re.findall(r"\b([a-zA-Z_][a-zA-Z0-9_]*)\b", expr)
    js_reserved = {
        "true", "false", "null", "undefined", "includes", "isEmpty", "indexOf",
        "length", "myValue", "val", "return", "if", "else", "Array", "String", "Number"
    }

    dependencies = set()
    for token in tokens:
        if token in known_question_ids and token not in js_reserved:
            dependencies.add(token)

    return list(dependencies)


def build_graph(concepts_dict, form_files):
    """Builds the full igraph directed graph."""
    g = ig.Graph(directed=True)

    # Node tracking maps: name -> vertex index
    node_indices = {}

    def get_or_create_node(name, **attrs):
        if name in node_indices:
            idx = node_indices[name]
            for k, v in attrs.items():
                if k not in g.vs[idx].attributes() or g.vs[idx][k] is None:
                    g.vs[idx][k] = v
            return idx
        idx = g.vcount()
        g.add_vertex(name=name, **attrs)
        node_indices[name] = idx
        return idx

    # Track existing directed edges to prevent duplicates: (src_idx, dst_idx, edge_type)
    existing_edges = set()

    def add_unique_edge(src, dst, **attrs):
        etype = attrs.get("edge_type", "")
        key = (src, dst, etype)
        if key not in existing_edges:
            existing_edges.add(key)
            g.add_edge(src, dst, **attrs)

    # 1. Register concepts from dictionary
    for uuid, c in concepts_dict.items():
        is_question = c["class"] == "Question" or c["datatype"] not in ("N/A", "")
        node_type = "Question" if is_question else "Answer"
        color = "#1f77b4" if is_question else "#2ca02c"
        size = 14 if is_question else 10

        get_or_create_node(
            uuid,
            label=c["name"],
            node_type=node_type,
            datatype=c["datatype"],
            color=color,
            size=size,
            shape="circle",
            hover=f"[{node_type}] {c['name']} (UUID: {uuid}) | Type: {c['datatype']}",
        )

        # Answer links defined in CSV
        for ans_uuid in c["answers"]:
            ans_name = concepts_dict.get(ans_uuid, {}).get("name", ans_uuid)
            get_or_create_node(
                ans_uuid,
                label=ans_name,
                node_type="Answer",
                datatype="N/A",
                color="#2ca02c",
                size=10,
                shape="circle",
                hover=f"[Answer] {ans_name} (UUID: {ans_uuid})",
            )
            add_unique_edge(
                node_indices[uuid],
                node_indices[ans_uuid],
                edge_type="HAS_ANSWER",
                color="#a1d99b",
                hover=f"{c['name']} → Has Answer → {ans_name}",
            )

    # 2. Parse forms
    forms_meta = {}

    for fpath in form_files:
        fname = os.path.basename(fpath)
        try:
            with open(fpath, "r", encoding="utf-8") as f:
                form_json = json.load(f)
        except Exception as e:
            print(f"[Warning] Failed to load form {fname}: {e}")
            continue

        form_title = form_json.get("name", fname)
        form_node_id = f"form:{fname}"
        forms_meta[fname] = {
            "title": form_title,
            "file": fname,
            "questions": [],
            "skips": [],
        }

        form_idx = get_or_create_node(
            form_node_id,
            label=form_title,
            node_type="Form",
            datatype="Form",
            color="#ff7f0e",
            size=26,
            shape="rectangle",
            hover=f"[Form] {form_title} ({fname})",
        )

        questions = extract_questions_from_form(form_json)
        q_id_to_concept = {}

        # First pass: map question ids to concepts
        for q in questions:
            qid = q.get("id")
            qopt = q.get("questionOptions", {})
            concept_uuid = qopt.get("concept")
            if qid and concept_uuid:
                q_id_to_concept[qid] = concept_uuid

        known_qids = set(q_id_to_concept.keys())

        # Collect question concepts that are targets of skip logic in this form
        skip_target_concepts = set()
        for q in questions:
            hide_obj = q.get("hide", {})
            hide_expr = hide_obj.get("hideWhenExpression") if isinstance(hide_obj, dict) else None
            if hide_expr:
                deps = extract_dependencies_from_expr(hide_expr, known_qids)
                for dep_qid in deps:
                    parent_concept_uuid = q_id_to_concept.get(dep_qid)
                    target_concept_uuid = q_id_to_concept.get(q.get("id"))
                    if parent_concept_uuid and target_concept_uuid and parent_concept_uuid != target_concept_uuid:
                        skip_target_concepts.add(target_concept_uuid)

        # Second pass: build edges
        for q in questions:
            qid = q.get("id")
            qlabel = q.get("label", qid or "Unnamed Question")
            qopt = q.get("questionOptions", {})
            concept_uuid = qopt.get("concept")

            if not concept_uuid:
                continue

            forms_meta[fname]["questions"].append(concept_uuid)

            # Ensure concept node exists
            concept_name = concepts_dict.get(concept_uuid, {}).get("name", qlabel)
            q_idx = get_or_create_node(
                concept_uuid,
                label=concept_name,
                node_type="Question",
                datatype=concepts_dict.get(concept_uuid, {}).get("datatype", "Unknown"),
                color="#1f77b4",
                size=16,
                shape="circle",
                hover=f"[Question] {concept_name} (UUID: {concept_uuid})",
            )

            # Edge: Form -> Contains -> Question (only for top-level root questions)
            if concept_uuid not in skip_target_concepts:
                add_unique_edge(
                    form_idx,
                    q_idx,
                    edge_type="CONTAINS",
                    color="#bdbdbd",
                    hover=f"Form '{form_title}' contains '{concept_name}'"
                )

            # Edge: Question -> Has Answer
            for ans in qopt.get("answers", []):
                ans_uuid = ans.get("concept")
                ans_label = ans.get("label", ans_uuid)
                if ans_uuid:
                    ans_idx = get_or_create_node(
                        ans_uuid,
                        label=ans_label,
                        node_type="Answer",
                        datatype="N/A",
                        color="#2ca02c",
                        size=10,
                        shape="circle",
                        hover=f"[Answer] {ans_label} (UUID: {ans_uuid})",
                    )
                    add_unique_edge(
                        q_idx,
                        ans_idx,
                        edge_type="HAS_ANSWER",
                        color="#a1d99b",
                        hover=f"'{concept_name}' has answer '{ans_label}'"
                    )

            # Edge: Skip Logic (Question A -> Controls -> Question B)
            hide_obj = q.get("hide", {})
            hide_expr = hide_obj.get("hideWhenExpression") if isinstance(hide_obj, dict) else None
            if hide_expr:
                deps = extract_dependencies_from_expr(hide_expr, known_qids)
                for dep_qid in deps:
                    parent_concept_uuid = q_id_to_concept.get(dep_qid)
                    if parent_concept_uuid and parent_concept_uuid != concept_uuid:
                        parent_idx = node_indices.get(parent_concept_uuid)
                        if parent_idx is not None:
                            forms_meta[fname]["skips"].append((parent_concept_uuid, concept_uuid, hide_expr))
                            add_unique_edge(
                                parent_idx,
                                q_idx,
                                edge_type="SKIP_LOGIC",
                                color="#d62728",
                                weight=2.5,
                                condition=hide_expr,
                                hover=f"SKIP LOGIC: '{dep_qid}' controls '{qid}'\nCondition: {hide_expr}",
                            )

    return g, forms_meta


def analyze_graph(g, concepts_dict, forms_meta):
    """Analyzes the graph for orphans, cycles, cross-form concepts, and complexity."""
    report = []
    report.append("=" * 70)
    report.append("  OPENMRS AIIMS CONCEPT & SKIP-LOGIC GRAPH ANALYSIS REPORT")
    report.append("=" * 70)

    # 1. Global Metrics
    total_nodes = g.vcount()
    total_edges = g.ecount()
    form_nodes = [v for v in g.vs if v["node_type"] == "Form"]
    question_nodes = [v for v in g.vs if v["node_type"] == "Question"]
    answer_nodes = [v for v in g.vs if v["node_type"] == "Answer"]

    skip_edges = [e for e in g.es if e["edge_type"] == "SKIP_LOGIC"]
    contains_edges = [e for e in g.es if e["edge_type"] == "CONTAINS"]
    has_answer_edges = [e for e in g.es if e["edge_type"] == "HAS_ANSWER"]

    report.append(f"\n[1] GRAPH TOPOLOGY SUMMARY")
    report.append(f"  • Total Vertices: {total_nodes} (Forms: {len(form_nodes)}, Questions: {len(question_nodes)}, Answers: {len(answer_nodes)})")
    report.append(f"  • Total Edges:    {total_edges}")
    report.append(f"    - Form Contains Edges:     {len(contains_edges)}")
    report.append(f"    - Question Answers Edges:  {len(has_answer_edges)}")
    report.append(f"    - Skip-Logic Branch Edges: {len(skip_edges)}")

    # 2. Skip Logic Cycle Detection (DAG test)
    skip_subgraph = g.subgraph_edges(skip_edges, delete_vertices=False)
    # Check if DAG
    is_dag = skip_subgraph.is_dag()
    report.append(f"\n[2] SKIP-LOGIC INTEGRITY & CYCLE DETECTION")
    if is_dag:
        report.append("  [PASS] No circular dependencies detected in skip-logic branching (Graph is a clean DAG).")
    else:
        report.append("  [CRITICAL ALERT] Circular dependencies detected in skip-logic expressions!")
        fas = skip_subgraph.feedback_arc_set()
        report.append(f"  Feedback arc set identified {len(fas)} cyclic edge(s).")

    # 3. Orphan Concepts Detection (in CSV but not referenced in any form)
    form_used_concepts = set()
    for f in forms_meta.values():
        form_used_concepts.update(f["questions"])

    orphan_concepts = []
    for uuid, c in concepts_dict.items():
        if c["class"] == "Question" and uuid not in form_used_concepts:
            orphan_concepts.append(c)

    report.append(f"\n[3] ORPHAN QUESTION CONCEPTS IN CSV ({len(orphan_concepts)} found)")
    if orphan_concepts:
        report.append("  (Defined as 'Question' in aiims_concepts.csv, but not present in any AMPATH form)")
        for o in orphan_concepts[:10]:
            report.append(f"  - [{o['uuid']}] {o['name']} ({o['datatype']})")
        if len(orphan_concepts) > 10:
            report.append(f"  ... and {len(orphan_concepts) - 10} more.")
    else:
        report.append("  [PASS] All question concepts defined in CSV are utilized across the forms.")

    # 4. External / CIEL Concepts (used in forms but absent from aiims_concepts.csv)
    external_concepts = []
    for q_node in question_nodes:
        uuid = q_node["name"]
        if uuid not in concepts_dict:
            external_concepts.append((uuid, q_node["label"]))

    report.append(f"\n[4] EXTERNAL / CIEL CONCEPTS IN FORMS ({len(external_concepts)} found)")
    if external_concepts:
        report.append("  (Referenced in forms, but mapped to CIEL or external dictionaries)")
        for uuid, label in external_concepts:
            report.append(f"  - [{uuid}] {label}")
    else:
        report.append("  None. All form concepts are strictly internal AIIMS concepts.")

    # 5. Form Complexity Ranking
    report.append(f"\n[5] FORM COMPLEXITY & BRANCHING METRICS")
    report.append(f"  {'Form Name':<35} | {'Questions':<10} | {'Skip Conditions':<15}")
    report.append("  " + "-" * 66)
    for fname, meta in sorted(forms_meta.items(), key=lambda x: len(x[1]["skips"]), reverse=True):
        report.append(f"  {meta['title'][:35]:<35} | {len(meta['questions']):<10} | {len(meta['skips']):<15}")

    # 6. Key Skip-Logic Hubs (Questions with highest skip control)
    report.append(f"\n[6] TOP SKIP-LOGIC CONTROLLERS (High Impact Hubs)")
    report.append("  (Variables whose values trigger the most visibility changes)")
    out_degrees = []
    for v in question_nodes:
        # count outgoing skip logic edges
        out_skips = sum(1 for e in v.out_edges() if e["edge_type"] == "SKIP_LOGIC")
        if out_skips > 0:
            out_degrees.append((v["label"], v["name"], out_skips))

    out_degrees.sort(key=lambda x: x[2], reverse=True)
    for label, uuid, count in out_degrees[:10]:
        report.append(f"  • {label} [{uuid[:8]}...]: controls visibility of {count} dependent fields")

    report.append("\n" + "=" * 70)
    return "\n".join(report)


def patch_gravis_html(html_str):
    """
    Patches Gravis D3 drag behavior:
    1. Removes violent reheat `simulation.alphaTarget(0.3).restart()` on mousedown so clicking a node
       does not cause all other nodes to rush or jitter.
    2. Gently reheats (`simulation.alpha(0.03).restart()`) only when the node is actively dragged,
       ensuring only connected links smoothly adapt without heating the entire network.
    3. On release (dragended), frees the fixed coordinates (d.fx = null, d.fy = null) and allows
       the node to naturally react to forces and settle into equilibrium.
    """
    # Disable reheat on dragstarted (mousedown)
    html_str = re.sub(
        r'if\s*\(!event\.active\s*&&\s*state\.layoutAlgorithmActive\)\s*\{\s*simulation\.alphaTarget\(0\.3\)\.restart\(\);\s*\}',
        '// Mousedown reheat disabled so other nodes remain calm\n                  if(!event.active && state.layoutAlgorithmActive) { /* alphaTarget(0.3) suppressed */ }',
        html_str,
    )
    # On actual drag movement, gently reheat alpha so only the dragged node and its immediate links move
    html_str = re.sub(
        r'function dragged\(event, d\)\{\s*d\.fx = event\.x;\s*d\.fy = event\.y;\s*if\(!state\.layoutAlgorithmActive\)\{',
        'function dragged(event, d){\n                  d.fx = event.x;\n                  d.fy = event.y;\n                  d.x = event.x;\n                  d.y = event.y;\n                  if(state.layoutAlgorithmActive){ simulation.alpha(0.03).restart(); } else {',
        html_str,
    )
    # On dragended, when node is freed, give gentle alpha so it settles with its forces
    html_str = re.sub(
        r'd\.fx = null;\s*d\.fy = null;',
        'd.fx = null;\n                      d.fy = null;\n                      if(state.layoutAlgorithmActive){ simulation.alpha(0.08).restart(); }',
        html_str,
    )
    return html_str


def export_visualizations(g):
    """Exports interactive HTML visualizations using Gravis with organic force-directed layout."""
    if not HAS_GRAVIS:
        return []

    os.makedirs(DOCS_DIR, exist_ok=True)
    output_files = []

    # 1. Skip-Logic Only Network (Clean, high insight)
    skip_edges = [e for e in g.es if e["edge_type"] == "SKIP_LOGIC"]
    if skip_edges:
        skip_subgraph = g.subgraph_edges(skip_edges, delete_vertices=True)
        fig_skip = gv.d3(
            skip_subgraph,
            graph_height=750,
            node_size_factor=1.6,
            node_hover_neighborhood=True,
            node_drag_fix=False,
            edge_curvature=0.2,
            use_many_body_force=True,
            many_body_force_strength=-45.0,
            use_many_body_force_max_distance=True,
            many_body_force_max_distance=220.0,
            use_links_force=True,
            links_force_distance=45.0,
            links_force_strength=0.7,
            use_centering_force=False,
            use_x_positioning_force=True,
            x_positioning_force_strength=0.015,
            use_y_positioning_force=True,
            y_positioning_force_strength=0.015,
            use_collision_force=True,
            collision_force_radius=40.0,
            collision_force_strength=0.7,
            zoom_factor=0.95,
            show_menu=True,
        )
        skip_html_path = os.path.join(DOCS_DIR, "skip_logic_dependency_graph.html")
        with open(skip_html_path, "w", encoding="utf-8") as f:
            f.write(patch_gravis_html(fig_skip.to_html_standalone()))
        output_files.append(skip_html_path)

    # 2. Complete Relationship Network (Forms + Questions + Answers + Skips)
    fig_full = gv.d3(
        g,
        graph_height=850,
        node_size_factor=1.1,
        node_hover_neighborhood=True,
        node_drag_fix=False,
        edge_curvature=0.15,
        use_many_body_force=True,
        many_body_force_strength=-35.0,
        use_many_body_force_max_distance=True,
        many_body_force_max_distance=180.0,
        use_links_force=True,
        links_force_distance=35.0,
        links_force_strength=0.8,
        use_centering_force=False,
        use_x_positioning_force=True,
        x_positioning_force_strength=0.015,
        use_y_positioning_force=True,
        y_positioning_force_strength=0.015,
        use_collision_force=True,
        collision_force_radius=40.0,
        collision_force_strength=0.8,
        zoom_factor=0.85,
        show_menu=True,
    )
    full_html_path = os.path.join(DOCS_DIR, "concept_relationship_graph.html")
    with open(full_html_path, "w", encoding="utf-8") as f:
        f.write(patch_gravis_html(fig_full.to_html_standalone()))
    output_files.append(full_html_path)

    return output_files


def main():
    print(f"Loading concepts from {CONCEPTS_CSV} ...")
    concepts_dict = load_concepts_csv(CONCEPTS_CSV)
    print(f"Found {len(concepts_dict)} concepts in dictionary.")

    form_files = glob.glob(os.path.join(FORMS_DIR, "*.json"))
    print(f"Found {len(form_files)} forms in {FORMS_DIR}.")

    print("Building iGraph directed relationship network ...")
    g, forms_meta = build_graph(concepts_dict, form_files)

    print("Analyzing graph properties ...")
    report_text = analyze_graph(g, concepts_dict, forms_meta)
    print(report_text)

    # Save text report to docs
    os.makedirs(DOCS_DIR, exist_ok=True)
    report_path = os.path.join(DOCS_DIR, "concept_graph_analysis_report.txt")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report_text)
    print(f"\n[Report saved] {report_path}")

    # Export interactive HTML visualizations
    print("Generating interactive Gravis HTML visualizations ...")
    exported_htmls = export_visualizations(g)
    for html_path in exported_htmls:
        print(f"[Visualization exported] {html_path}")


if __name__ == "__main__":
    main()
