import { AIIMS_PREV_SURGERY_FORM_UUID, CONCEPTS } from '../constants';
import { formatObsValue, useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface ProcedureWithLaterality {
  procedure: string;
  laterality?: string;
}

export interface AiimsPreviousSurgeryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  previousSurgeryPerformed?: string;
  surgicalApproach?: string;
  yearOrDateOfSurgery?: string;
  uterineSurgeries: string[];
  endometriosisSurgeries: ProcedureWithLaterality[];
  ovarianSurgeries: ProcedureWithLaterality[];
  tubalSurgeries: ProcedureWithLaterality[];
  peritonealSurgeries: string[];
  intraoperativeFindings?: string;
  previousSurgeryOtherNotes?: string;
}

export const initialAiimsPreviousSurgeryData: Readonly<AiimsPreviousSurgeryData> = Object.freeze({
  hasData: false,
  uterineSurgeries: [],
  endometriosisSurgeries: [],
  ovarianSurgeries: [],
  tubalSurgeries: [],
  peritonealSurgeries: [],
});

function formatLaterality(val?: string): string | undefined {
  if (!val) return undefined;
  const lower = val.trim().toLowerCase();
  if (val === CONCEPTS.lateralityRight || lower === 'right') return 'Right';
  if (val === CONCEPTS.lateralityLeft || lower === 'left') return 'Left';
  if (val === CONCEPTS.lateralityBilateral || lower === 'bilateral') return 'Bilateral';
  return val;
}

// Mapping of procedure concept UUIDs and labels to their laterality question concept UUIDs
const PROCEDURE_TO_LATERALITY_MAP: Record<string, string> = {
  // Endometriosis - UUIDs
  [CONCEPTS.endometrioticCystectomy]: CONCEPTS.endometrioticCystectomyLaterality,
  [CONCEPTS.endometrioticBipolarAblation]: CONCEPTS.endometrioticBipolarAblationLaterality,
  [CONCEPTS.endometrioticApc]: CONCEPTS.endometrioticApcLaterality,
  [CONCEPTS.endometrioticDrainage]: CONCEPTS.endometrioticDrainageLaterality,
  [CONCEPTS.endometrioticSclerotherapy]: CONCEPTS.endometrioticSclerotherapyLaterality,
  [CONCEPTS.endometriosisOophorectomy]: CONCEPTS.endometriosisOophorectomyLaterality,
  // Endometriosis - Display Names
  'endometriotic cystectomy': CONCEPTS.endometrioticCystectomyLaterality,
  'endometriotic bipolar ablation': CONCEPTS.endometrioticBipolarAblationLaterality,
  'endometriotic argon plasma coagulation': CONCEPTS.endometrioticApcLaterality,
  'endometriotic apc': CONCEPTS.endometrioticApcLaterality,
  'endometriotic drainage': CONCEPTS.endometrioticDrainageLaterality,
  'endometriotic sclerotherapy': CONCEPTS.endometrioticSclerotherapyLaterality,
  'endometriosis oophorectomy': CONCEPTS.endometriosisOophorectomyLaterality,

  // Ovarian - UUIDs
  [CONCEPTS.ovarianDermoid]: CONCEPTS.ovarianDermoidLaterality,
  [CONCEPTS.simpleOvarianCyst]: CONCEPTS.simpleOvarianCystLaterality,
  [CONCEPTS.paraovarianCyst]: CONCEPTS.paraovarianCystLaterality,
  [CONCEPTS.ovarianCystAspiration]: CONCEPTS.ovarianCystAspirationLaterality,
  [CONCEPTS.oophorectomyProcedure]: CONCEPTS.oophorectomyLaterality,
  [CONCEPTS.ovarianCystectomy]: CONCEPTS.ovarianCystectomyLaterality,
  // Ovarian - Display Names
  'ovarian dermoid/mature teratoma': CONCEPTS.ovarianDermoidLaterality,
  'ovarian dermoid': CONCEPTS.ovarianDermoidLaterality,
  'simple ovarian cyst': CONCEPTS.simpleOvarianCystLaterality,
  'paraovarian cyst': CONCEPTS.paraovarianCystLaterality,
  'ovarian cyst aspiration': CONCEPTS.ovarianCystAspirationLaterality,
  'oophorectomy': CONCEPTS.oophorectomyLaterality,
  'ovarian cystectomy': CONCEPTS.ovarianCystectomyLaterality,

  // Tubal - UUIDs
  [CONCEPTS.chromopertubation]: CONCEPTS.chromopertubationLaterality,
  [CONCEPTS.tubalCannulation]: CONCEPTS.tubalCannulationLaterality,
  [CONCEPTS.salpingectomy]: CONCEPTS.salpingectomyLaterality,
  [CONCEPTS.fimbrioplasty]: CONCEPTS.fimbrioplastyLaterality,
  [CONCEPTS.tubalClipping]: CONCEPTS.tubalClippingLaterality,
  [CONCEPTS.recanalization]: CONCEPTS.recanalizationLaterality,
  // Tubal - Display Names
  'chromopertubation of fallopian tubes': CONCEPTS.chromopertubationLaterality,
  'chromopertubation': CONCEPTS.chromopertubationLaterality,
  'tubal cannulation': CONCEPTS.tubalCannulationLaterality,
  'salpingectomy of fallopian tubes': CONCEPTS.salpingectomyLaterality,
  'salpingectomy': CONCEPTS.salpingectomyLaterality,
  'fimbrioplasty of fallopian tubes': CONCEPTS.fimbrioplastyLaterality,
  'fimbrioplasty': CONCEPTS.fimbrioplastyLaterality,
  'tubal clipping of fallopian tubes': CONCEPTS.tubalClippingLaterality,
  'tubal clipping': CONCEPTS.tubalClippingLaterality,
  'recanalization of fallopian tubes': CONCEPTS.recanalizationLaterality,
  'recanalization': CONCEPTS.recanalizationLaterality,
};

export function usePreviousSurgery(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_PREV_SURGERY_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
    getObsValues,
    obsByConcept,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    return {
      previousSurgeryData: initialAiimsPreviousSurgeryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const mapProceduresWithLaterality = (questionUuid: string): ProcedureWithLaterality[] => {
    const obsList = obsByConcept.get(questionUuid) ?? [];
    if (obsList.length > 0) {
      const seen = new Set<string>();
      const result: ProcedureWithLaterality[] = [];

      for (const item of obsList) {
        const valObj = item.value as unknown as Record<string, unknown> | null;
        const display =
          valObj && typeof valObj === 'object' && typeof valObj.display === 'string'
            ? valObj.display
            : formatObsValue(item.value);

        const valUuid =
          valObj && typeof valObj === 'object' && typeof valObj.uuid === 'string'
            ? valObj.uuid
            : typeof item.value === 'string'
              ? item.value
              : '';

        const procedureKey = display || valUuid;
        if (!procedureKey || seen.has(procedureKey)) continue;
        seen.add(procedureKey);

        const lateralityConcept =
          PROCEDURE_TO_LATERALITY_MAP[valUuid] ||
          PROCEDURE_TO_LATERALITY_MAP[display.toLowerCase()] ||
          PROCEDURE_TO_LATERALITY_MAP[procedureKey.toLowerCase()];

        const rawLaterality = lateralityConcept ? getOptionalObsValue(lateralityConcept) : undefined;
        const laterality = formatLaterality(rawLaterality);

        result.push({
          procedure: procedureKey,
          laterality,
        });
      }

      return result;
    }

    const procedures = getObsValues(questionUuid);
    return procedures.map(proc => {
      const lateralityConcept =
        PROCEDURE_TO_LATERALITY_MAP[proc] ||
        PROCEDURE_TO_LATERALITY_MAP[proc.toLowerCase()];
      const rawLaterality = lateralityConcept ? getOptionalObsValue(lateralityConcept) : undefined;
      return { procedure: proc, laterality: formatLaterality(rawLaterality) };
    });
  };

  const previousSurgeryData: AiimsPreviousSurgeryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    previousSurgeryPerformed: getOptionalObsValue(CONCEPTS.previousSurgeryPerformed),
    surgicalApproach: getOptionalObsValue(CONCEPTS.surgicalApproach),
    yearOrDateOfSurgery: getOptionalObsValue(CONCEPTS.yearOrDateOfSurgery),
    uterineSurgeries: getObsValues(CONCEPTS.uterineSurgeries),
    endometriosisSurgeries: mapProceduresWithLaterality(CONCEPTS.endometriosisSurgeries),
    ovarianSurgeries: mapProceduresWithLaterality(CONCEPTS.ovarianSurgeries),
    tubalSurgeries: mapProceduresWithLaterality(CONCEPTS.fallopianTubeSurgeries),
    peritonealSurgeries: getObsValues(CONCEPTS.peritonealSurgeries),
    intraoperativeFindings: getOptionalObsValue(CONCEPTS.intraoperativeFindings),
    previousSurgeryOtherNotes: getOptionalObsValue(CONCEPTS.previousSurgeryOtherNotes),
  };

  return {
    previousSurgeryData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
