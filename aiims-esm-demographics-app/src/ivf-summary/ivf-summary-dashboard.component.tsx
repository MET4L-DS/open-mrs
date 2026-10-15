import React from 'react';
import { useTranslation } from 'react-i18next';
import { InlineLoading, InlineNotification } from '@carbon/react';
import {
  ChartCustom,
  ParentChild,
  Microscope,
  Medication,
  Activity,
  PedestrianChild,
  Chemistry,
  ReportData,
  Calendar,
  Scalpel,
  Timer,
  EventSchedule,
} from '@carbon/react/icons';
import { usePatient } from '@openmrs/esm-framework';
import { ObservationCard, type ObservationRow } from '../shared/components';
import { useIvfSummary } from './ivf-summary.resource';
import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_FORM_UUID,
  AIIMS_INFERTILITY_FORM_UUID,
  AIIMS_OBSTETRIC_FORM_UUID,
  AIIMS_MENSTRUAL_FORM_UUID,
  AIIMS_FEMALE_FACTOR_FORM_UUID,
  AIIMS_MALE_FACTOR_FORM_UUID,
  AIIMS_MALE_HORMONE_SURGERY_FORM_UUID,
  AIIMS_PREV_OI_IUI_FORM_UUID,
  AIIMS_PREV_SURGERY_FORM_UUID,
  AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID,
  AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID,
  AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID,
  AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID,
  AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID,
  AIIMS_DOSE_OF_DRUGS_FORM_UUID,
  AIIMS_ADJUVANT_DRUG_FORM_UUID,
  AIIMS_TRIGGER_DETAILS_FORM_UUID,
  AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID,
  AIIMS_PROCEDURE_FORM_UUID,
  AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID,
  AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID,
  AIIMS_EMBRYO_ASSESSMENT_FORM_UUID,
  AIIMS_FERTILISATION_DETAILS_FORM_UUID,
  AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID,
  AIIMS_EMBRYOS_FROZEN_FORM_UUID,
  AIIMS_FRESH_ET_DETAILS_FORM_UUID,
  AIIMS_ADD_PROCEDURE_ART_FORM_UUID,
  AIIMS_POST_IVF_INVESTIGATION_FORM_UUID,
  AIIMS_EXAMINATION_INFANT_FORM_UUID,
} from '../config/form-uuids';
import styles from './ivf-summary.styles.scss';

export interface IvfSummaryDashboardProps {
  patientUuid?: string;
  basePath?: string;
}

export default function IvfSummaryDashboard({
  patientUuid: propPatientUuid,
}: IvfSummaryDashboardProps) {
  const { t } = useTranslation();
  const { patient, patientUuid: contextPatientUuid, isLoading: isPatientLoading } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const { summaryData, isLoading, error, getFormObs } = useIvfSummary(patientUuid);


  if (isLoading || isPatientLoading) {
    return (
      <div className={styles.summaryContainer}>
        <InlineLoading description={t('loadingIvfSummary', 'Consolidating patient IVF clinical summary...')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.summaryContainer}>
        <InlineNotification
          kind="error"
          title={t('errorLoadingSummary', 'Error Loading IVF Summary')}
          subtitle={String(error)}
        />
      </div>
    );
  }

  // Domain 1: Patient Infertility & Prior History
  const profileRows: ObservationRow[] = [
    { label: t('patientAge', 'Wife Age'), value: getFormObs(AIIMS_FORM_UUID, CONCEPTS.patientAge) || '—' },
    { label: t('husbandAge', 'Husband Age'), value: getFormObs(AIIMS_FORM_UUID, CONCEPTS.husbandAge) || '—' },
    { label: t('patientBmi', 'Wife BMI'), value: getFormObs(AIIMS_FORM_UUID, CONCEPTS.patientBmi) ? `${getFormObs(AIIMS_FORM_UUID, CONCEPTS.patientBmi)} kg/m²` : '—' },
    { label: t('infertilityType', 'Infertility Type'), value: getFormObs(AIIMS_INFERTILITY_FORM_UUID, CONCEPTS.typeOfInfertility) || '—' },
    { label: t('infertilityDuration', 'Duration (Years)'), value: getFormObs(AIIMS_INFERTILITY_FORM_UUID, CONCEPTS.durationOfInfertility) || '—' },
  ];

  const obstetricRows: ObservationRow[] = [
    { label: t('gravida', 'Gravida'), value: getFormObs(AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS.gravida) || '—' },
    { label: t('parity', 'Parity'), value: getFormObs(AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS.parity) || '—' },
    { label: t('livingChildren', 'Living Children'), value: getFormObs(AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS.livingChildren) || '—' },
    { label: t('abortions', 'Abortions'), value: getFormObs(AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS.abortionMiscarriage) || '—' },
    { label: t('ectopicPregnancy', 'Ectopic Pregnancies'), value: getFormObs(AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS.ectopicPregnancy) || '—' },
    { label: t('cycleLength', 'Cycle Regularity'), value: getFormObs(AIIMS_MENSTRUAL_FORM_UUID, CONCEPTS.patternOfMenstrualCycle) || '—' },
  ];

  const priorHistoryRows: ObservationRow[] = [
    {
      label: t('failedIvf', 'Prior Failed IVF Cycles'),
      value: getFormObs(AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS.failedIvfCycles) || getFormObs(AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS.failedIvf) || '—',
    },
    {
      label: t('prevIui', 'Prior IUI Cycles'),
      value: getFormObs(AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS.iuiCycles)
        ? `${getFormObs(AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS.iuiCycles)} cycles`
        : getFormObs(AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS.prevOiIui) || '—',
    },
    {
      label: t('previousSurgery', 'Previous Pelvic Surgery'),
      value: getFormObs(AIIMS_PREV_SURGERY_FORM_UUID, CONCEPTS.previousSurgeryPerformed)
        ? `${getFormObs(AIIMS_PREV_SURGERY_FORM_UUID, CONCEPTS.previousSurgeryPerformed)}${
            getFormObs(AIIMS_PREV_SURGERY_FORM_UUID, CONCEPTS.surgicalApproach)
              ? ` (${getFormObs(AIIMS_PREV_SURGERY_FORM_UUID, CONCEPTS.surgicalApproach)})`
              : ''
          }`
        : '—',
    },
    {
      label: t('tbHistory', 'Tuberculosis History'),
      value: getFormObs(AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID, CONCEPTS.tbSite)
        ? `${getFormObs(AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID, CONCEPTS.tbSite)}${
            getFormObs(AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID, CONCEPTS.attDuration)
              ? ` (ATT: ${getFormObs(AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID, CONCEPTS.attDuration)})`
              : ''
          }`
        : '—',
    },
  ];

  // Domain 2: Diagnostic Factors & Hormones
  const factorRows: ObservationRow[] = [
    { label: t('tubalFactor', 'Tubal Factor'), value: getFormObs(AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS.tubalFactorDetails) || '—' },
    { label: t('ovarianFactor', 'Ovarian Factor'), value: getFormObs(AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS.dorDetails) || '—' },
    { label: t('uterineFactor', 'Uterine Factor'), value: getFormObs(AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS.uterineFactorDetails) || '—' },
    { label: t('poseidonGroup', 'POSEIDON Group'), value: getFormObs(AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS.poseidonGroup) || '—' },
    { label: t('endometriosisStage', 'Endometriosis Stage'), value: getFormObs(AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS.endometriosisClassification) || '—' },
    { label: t('maleFactor', 'Male Factor'), value: getFormObs(AIIMS_MALE_FACTOR_FORM_UUID, CONCEPTS.maleInfertilityFactor) || '—' },
    { label: t('azoospermiaDetails', 'Azoospermia Details'), value: getFormObs(AIIMS_MALE_FACTOR_FORM_UUID, CONCEPTS.azoospermiaDetails) || '—' },
  ];

  const reserveRows: ObservationRow[] = [
    { label: t('amh', 'Serum AMH'), value: getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.antiMullerianHormone) ? `${getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.antiMullerianHormone)} ng/mL` : '—' },
    { label: t('antralFollicleCount', 'Total AFC'), value: getFormObs(AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID, CONCEPTS.totalAntralFollicleCount) || '—' },
    { label: t('fsh', 'Serum FSH (Day 2)'), value: getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.day2FollicleStimulatingHormone) ? `${getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.day2FollicleStimulatingHormone)} mIU/mL` : '—' },
    { label: t('tsh', 'Serum TSH'), value: getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.thyroidStimulatingHormone) ? `${getFormObs(AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS.thyroidStimulatingHormone)} µIU/mL` : '—' },
  ];

  const maleEvalRows: ObservationRow[] = [
    { label: t('semenCount', 'Sperm Concentration'), value: getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.semenCount) ? `${getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.semenCount)} M/mL` : '—' },
    { label: t('semenMotilityTotalProgressive', 'Progressive Motility'), value: getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.semenMotilityTotalProgressive) ? `${getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.semenMotilityTotalProgressive)}%` : '—' },
    { label: t('spermMorphology', 'Normal Morphology'), value: getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.spermMorphology) ? `${getFormObs(AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID, CONCEPTS.spermMorphology)}%` : '—' },
    {
      label: t('husbandHormones', 'Husband Hormones'),
      value: getFormObs(AIIMS_MALE_HORMONE_SURGERY_FORM_UUID, CONCEPTS.fshHusband)
        ? `FSH: ${getFormObs(AIIMS_MALE_HORMONE_SURGERY_FORM_UUID, CONCEPTS.fshHusband)} mIU/mL`
        : getFormObs(AIIMS_MALE_HORMONE_SURGERY_FORM_UUID, CONCEPTS.testosteroneHusband)
        ? `Testo: ${getFormObs(AIIMS_MALE_HORMONE_SURGERY_FORM_UUID, CONCEPTS.testosteroneHusband)} ng/dL`
        : '—',
    },
  ];

  // Domain 3: Stimulation & Cycle Monitoring
  const protocolRows: ObservationRow[] = [
    { label: t('stimulationProtocol', 'Stimulation Protocol'), value: getFormObs(AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID, CONCEPTS.ovarianStimulationProtocol) || '—' },
    { label: t('startingFshDose', 'Starting Dose'), value: getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.startingDoseFsh) ? `${getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.startingDoseFsh)} IU` : '—' },
    {
      label: t('totalGonadotropinDose', 'Total Gonadotropins'),
      value: getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDoseFsh)
        ? `${getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDoseFsh)} IU`
        : getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDoseHmg)
        ? `${getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDoseHmg)} IU (HMG)`
        : '—',
    },
    { label: t('stimulationDays', 'Stimulation Duration'), value: getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDaysOfStimulation) ? `${getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalDaysOfStimulation)} days` : '—' },
    { label: t('cetrotideDose', 'Antagonist Dose'), value: getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalCetrotideDose) ? `${getFormObs(AIIMS_DOSE_OF_DRUGS_FORM_UUID, CONCEPTS.totalCetrotideDose)} mg` : '—' },
  ];

  const triggerRows: ObservationRow[] = [
    { label: t('numberOfFollicles16to22mm', 'Follicles ≥ 16mm'), value: getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.numberOfFollicles16to22mm) || '—' },
    {
      label: t('ovulationTrigger', 'Trigger Drug & Dose'),
      value: getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.ovulationTrigger)
        ? `${getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.ovulationTrigger)}${
            getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.ovulationTriggerDose)
              ? ` (${getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.ovulationTriggerDose)})`
              : ''
          }`
        : '—',
    },
    { label: t('endometrialThicknessTrigger', 'Trigger Day Endometrium'), value: getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.endometrialThicknessTriggerDay) ? `${getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.endometrialThicknessTriggerDay)} mm` : '—' },
    { label: t('estradiolTrigger', 'Peak Estradiol (E2)'), value: getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.estradiolTriggerDay) ? `${getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.estradiolTriggerDay)} pg/mL` : '—' },
    { label: t('progesteroneTrigger', 'Trigger Day Progesterone'), value: getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.progesteroneTriggerDay) ? `${getFormObs(AIIMS_TRIGGER_DETAILS_FORM_UUID, CONCEPTS.progesteroneTriggerDay)} ng/mL` : '—' },
  ];

  // Domain 4: OPU, Insemination & Laboratory
  const oocyteRows: ObservationRow[] = [
    { label: t('totalOocytesRetrieved', 'Total Oocytes Retrieved'), value: getFormObs(AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID, CONCEPTS.numberOfOocytesRetrieved) || '—' },
    { label: t('miiOocytes', 'Metaphase II (MII)'), value: getFormObs(AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID, CONCEPTS.metaphase2) || '—' },
    { label: t('miOocytes', 'Metaphase I (MI)'), value: getFormObs(AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID, CONCEPTS.metaphase1) || '—' },
    { label: t('gvOocytes', 'Germinal Vesicles (GV)'), value: getFormObs(AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID, CONCEPTS.germinalVesicle) || '—' },
  ];

  const inseminationRows: ObservationRow[] = [
    { label: t('inseminationMethod', 'Insemination Modality'), value: getFormObs(AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID, CONCEPTS.methodOfInsemination) || '—' },
    { label: t('spermRetrieval', 'Sperm Retrieval Source'), value: getFormObs(AIIMS_PROCEDURE_FORM_UUID, CONCEPTS.spermRetrievalProcedure) || '—' },
    { label: t('postWashConcentration', 'Post-Wash Sperm Count'), value: getFormObs(AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID, CONCEPTS.postWashSpermConcentration) ? `${getFormObs(AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID, CONCEPTS.postWashSpermConcentration)} M/mL` : '—' },
    { label: t('postWashMotility', 'Post-Wash Motility'), value: getFormObs(AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID, CONCEPTS.spermMotilityOpuDay) ? `${getFormObs(AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID, CONCEPTS.spermMotilityOpuDay)}%` : '—' },
  ];

  // Domain 5: Embryology & Cryopreservation
  const fertilizationRows: ObservationRow[] = [
    { label: t('numberEmbryosDay1', 'Day 1 (2PN Fertilization)'), value: getFormObs(AIIMS_EMBRYO_ASSESSMENT_FORM_UUID, CONCEPTS.numberEmbryosDay1) || '—' },
    { label: t('fertilizationRate', 'Fertilization Rate'), value: getFormObs(AIIMS_FERTILISATION_DETAILS_FORM_UUID, CONCEPTS.fertilisationRate) ? `${getFormObs(AIIMS_FERTILISATION_DETAILS_FORM_UUID, CONCEPTS.fertilisationRate)}%` : '—' },
    { label: t('numberEmbryosDay3', 'Day 3 Cleavage Embryos'), value: getFormObs(AIIMS_EMBRYO_ASSESSMENT_FORM_UUID, CONCEPTS.numberEmbryosDay3) || '—' },
    { label: t('grade1EmbryosDay3', 'Grade 1/2 Embryos (Day 3)'), value: getFormObs(AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID, CONCEPTS.grade1EmbryosDay3) || '—' },
    { label: t('cleavageRate', 'Cleavage Rate'), value: getFormObs(AIIMS_FERTILISATION_DETAILS_FORM_UUID, CONCEPTS.cleavageRate) ? `${getFormObs(AIIMS_FERTILISATION_DETAILS_FORM_UUID, CONCEPTS.cleavageRate)}%` : '—' },
  ];

  const blastocystRows: ObservationRow[] = [
    { label: t('blastocystsDay5', 'Day 5 Blastocysts Count'), value: getFormObs(AIIMS_EMBRYO_ASSESSMENT_FORM_UUID, CONCEPTS.numberEmbryosDay5) || '—' },
    { label: t('blastocystGrade', 'Blastocyst Quality / Grade'), value: getFormObs(AIIMS_EMBRYO_ASSESSMENT_FORM_UUID, CONCEPTS.gradeEmbryosDay5) || '—' },
    { label: t('vitrifiedDay3', 'Day 3 Embryos Vitrified'), value: getFormObs(AIIMS_EMBRYOS_FROZEN_FORM_UUID, CONCEPTS.numberDay3EmbryosVitrified) || '—' },
    { label: t('vitrifiedDay5', 'Day 5 Blastocysts Vitrified'), value: getFormObs(AIIMS_EMBRYOS_FROZEN_FORM_UUID, CONCEPTS.numberDay5EmbryosVitrified) || '—' },
  ];

  // Domain 6: Transfer, Outcome & Neonate
  const transferRows: ObservationRow[] = [
    { label: t('freshEtStatus', 'Fresh ET Status'), value: getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.freshEmbryoTransfer) || '—' },
    { label: t('reasonEtDeferred', 'Deferred / Cancellation Reason'), value: getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.reasonFreshEtNotDone) || '—' },
    {
      label: t('embryosTransferred', 'Embryos Transferred'),
      value: getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.numberFreshEmbryosTransferred)
        ? `${getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.numberFreshEmbryosTransferred)}${
            getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.gradeFreshEmbryosTransferred)
              ? ` (Grade ${getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.gradeFreshEmbryosTransferred)})`
              : ''
          }`
        : '—',
    },
    { label: t('dayOfEt', 'Transfer Day'), value: getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.dayOfFreshEmbryoTransfer) || '—' },
    { label: t('freshEtDifficulty', 'Transfer Ease / Difficulty'), value: getFormObs(AIIMS_FRESH_ET_DETAILS_FORM_UUID, CONCEPTS.freshEtDifficulty) || '—' },
    { label: t('artAddons', 'ART Add-ons'), value: getFormObs(AIIMS_ADD_PROCEDURE_ART_FORM_UUID, CONCEPTS.additionalProceduresArt) || '—' },
  ];

  const outcomeRows: ObservationRow[] = [
    { label: t('uptResult', 'Urine Pregnancy Test (UPT)'), value: getFormObs(AIIMS_POST_IVF_INVESTIGATION_FORM_UUID, CONCEPTS.uptResult) || '—' },
    { label: t('betaHcg', 'Serum Beta-hCG'), value: getFormObs(AIIMS_POST_IVF_INVESTIGATION_FORM_UUID, CONCEPTS.betaHcg) ? `${getFormObs(AIIMS_POST_IVF_INVESTIGATION_FORM_UUID, CONCEPTS.betaHcg)} mIU/mL` : '—' },
    { label: t('scan6To7Weeks', '6-7 Week Scan Viability'), value: getFormObs(AIIMS_POST_IVF_INVESTIGATION_FORM_UUID, CONCEPTS.scan6To7Weeks) || '—' },
    { label: t('postIvfOutcome', 'Clinical Outcome'), value: getFormObs(AIIMS_POST_IVF_INVESTIGATION_FORM_UUID, CONCEPTS.postIvfOutcome) || '—' },
    { label: t('sexOfBaby', 'Sex of Baby'), value: getFormObs(AIIMS_EXAMINATION_INFANT_FORM_UUID, CONCEPTS.sexOfBaby) || '—' },
    { label: t('weightOfBaby', 'Birth Weight'), value: getFormObs(AIIMS_EXAMINATION_INFANT_FORM_UUID, CONCEPTS.weightOfBaby) ? `${getFormObs(AIIMS_EXAMINATION_INFANT_FORM_UUID, CONCEPTS.weightOfBaby)} kg` : '—' },
    { label: t('apgarScore', 'APGAR Score'), value: getFormObs(AIIMS_EXAMINATION_INFANT_FORM_UUID, CONCEPTS.apgarScore) ? `${getFormObs(AIIMS_EXAMINATION_INFANT_FORM_UUID, CONCEPTS.apgarScore)} / 10` : '—' },
  ];

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('ivfSummaryDashboardTitle', 'AIIMS Comprehensive IVF Summary')}</h2>
        <p className={styles.subtitle}>{t('ivfSummarySubtitle', 'Consolidated clinical parameters across all 34 reproductive medicine intake and procedure modules')}</p>
      </div>

      {/* Domain 1: Patient Infertility & Prior History */}
      <div className={styles.domainHeader}>
        <ParentChild size={20} />
        <h3>{t('domainInfertilityHistory', '1. Infertility Profile & Prior History')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('demographicsProfile', 'Demographics & Couple Profile')} icon={ChartCustom} rows={profileRows} />
        <ObservationCard title={t('obstetricMenstrual', 'Obstetric & Menstrual Profile')} icon={Calendar} rows={obstetricRows} />
        <ObservationCard title={t('priorReproductiveSurgery', 'Prior Reproductive & Surgical History')} icon={Scalpel} rows={priorHistoryRows} />
      </div>

      {/* Domain 2: Ovarian Reserve & Diagnostic Factors */}
      <div className={styles.domainHeader}>
        <Microscope size={20} />
        <h3>{t('domainDiagnostics', '2. Ovarian Reserve & Diagnostic Subtyping')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('diagnosticPrognostic', 'Diagnostic Factors & Prognostic Groups')} icon={Activity} rows={factorRows} />
        <ObservationCard title={t('hormonalUltrasoundReserve', 'Hormonal & Ultrasound Reserve')} icon={Microscope} rows={reserveRows} />
        <ObservationCard title={t('maleEvaluation', 'Male Semen & Hormonal Evaluation')} icon={Chemistry} rows={maleEvalRows} />
      </div>

      {/* Domain 3: Stimulation & Cycle Monitoring */}
      <div className={styles.domainHeader}>
        <Medication size={20} />
        <h3>{t('domainStimulationMonitoring', '3. Ovarian Stimulation & Cycle Monitoring')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('protocolDrugDosages', 'Protocol & Gonadotropin Dosages')} icon={Medication} rows={protocolRows} />
        <ObservationCard title={t('triggerDayMonitoring', 'Trigger Day Monitoring & ET Readiness')} icon={Timer} rows={triggerRows} />
      </div>

      {/* Domain 4: OPU, Insemination & Laboratory */}
      <div className={styles.domainHeader}>
        <Chemistry size={20} />
        <h3>{t('domainOpuInsemination', '4. OPU, Insemination & Laboratory Procedures')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('oocyteYieldMaturity', 'Oocyte Yield & Nuclear Maturity')} icon={Microscope} rows={oocyteRows} />
        <ObservationCard title={t('inseminationSemenPrep', 'Insemination Modality & Semen Prep')} icon={Chemistry} rows={inseminationRows} />
      </div>

      {/* Domain 5: Embryology & Cryopreservation */}
      <div className={styles.domainHeader}>
        <ReportData size={20} />
        <h3>{t('domainEmbryologyVitrification', '5. Embryology Culture & Cryopreservation')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('fertilizationCleavage', 'Fertilization & Cleavage Dynamics')} icon={Activity} rows={fertilizationRows} />
        <ObservationCard title={t('blastocystVitrification', 'Blastocyst Culture & Vitrification Stock')} icon={ReportData} rows={blastocystRows} />
      </div>

      {/* Domain 6: Transfer, Outcome & Neonate */}
      <div className={styles.domainHeader}>
        <PedestrianChild size={20} />
        <h3>{t('domainTransferOutcome', '6. Embryo Transfer, Pregnancy Outcome & Neonate')}</h3>
      </div>
      <div className={styles.grid}>
        <ObservationCard title={t('embryoTransferAddons', 'Embryo Transfer Details & ART Add-ons')} icon={EventSchedule} rows={transferRows} />
        <ObservationCard title={t('pregnancyOutcomeNeonate', 'Pregnancy Outcome & Infant Examination')} icon={PedestrianChild} rows={outcomeRows} />
      </div>
    </div>
  );
}

