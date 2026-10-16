import { AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsFemaleSurgicalProcedureData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;

  // Hysteroscopy Findings
  hysteroscopyOstia?: string;
  hysteroscopyEndometrium?: string;
  hysteroscopyEndometrialCavity?: string;
  hysteroscopyCervicalCanalDirection?: string;
  hysteroscopyDimensions?: string;
  operativeHysteroscopy?: string;

  // Remarks
  femaleSurgicalProcedureRemarks?: string;
}

export const initialAiimsFemaleSurgicalProcedureData: Readonly<AiimsFemaleSurgicalProcedureData> = Object.freeze({
  hasData: false,
});

export function useFemaleSurgicalProcedure(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    return {
      femaleSurgicalProcedureData: initialAiimsFemaleSurgicalProcedureData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  // Diagnostic Hysteroscopy Findings
  const hysteroscopyOstia = getOptionalObsValue(CONCEPTS.hysteroscopyOstia);
  const hysteroscopyEndometrium = getOptionalObsValue(CONCEPTS.hysteroscopyEndometrium);
  const hysteroscopyEndometrialCavity = getOptionalObsValue(CONCEPTS.hysteroscopyEndometrialCavity);
  const hysteroscopyCervicalCanalDirection = getOptionalObsValue(CONCEPTS.hysteroscopyCervicalCanalDirection);
  const hysteroscopyDimensions = getOptionalObsValue(CONCEPTS.hysteroscopyDimensions);
  const operativeHysteroscopy = getOptionalObsValue(CONCEPTS.operativeHysteroscopy);

  // Remarks
  const femaleSurgicalProcedureRemarks = getOptionalObsValue(CONCEPTS.femaleSurgicalProcedureRemarks);

  const hasData =
    hysteroscopyOstia !== undefined ||
    hysteroscopyEndometrium !== undefined ||
    hysteroscopyEndometrialCavity !== undefined ||
    hysteroscopyCervicalCanalDirection !== undefined ||
    hysteroscopyDimensions !== undefined ||
    operativeHysteroscopy !== undefined ||
    femaleSurgicalProcedureRemarks !== undefined;

  const femaleSurgicalProcedureData: AiimsFemaleSurgicalProcedureData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    hysteroscopyOstia,
    hysteroscopyEndometrium,
    hysteroscopyEndometrialCavity,
    hysteroscopyCervicalCanalDirection,
    hysteroscopyDimensions,
    operativeHysteroscopy,
    femaleSurgicalProcedureRemarks,
  };

  return {
    femaleSurgicalProcedureData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
