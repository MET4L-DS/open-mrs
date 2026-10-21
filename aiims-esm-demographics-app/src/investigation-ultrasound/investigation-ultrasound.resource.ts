import { AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsInvestigationUltrasoundData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;

  // TVS Uterine Size & Endometrial Findings
  dayOfCycle?: string | number;
  uterineSizeLength?: string | number;
  uterineSizeWidth?: string | number;
  uterineSizeTransverseDiameter?: string | number;
  uterineSizeVolume?: string | number;
  day1416EndometrialThickness?: string | number;
  day1416EndometrialPattern?: string;
  endometrialVascularity?: string;
  adenomyosisTvsFinding?: string;
  focalAdenomyomaDimensions?: string;
  uterineCalcifications?: string;

  // TVS Fibroids
  fibroidsPresent?: string;
  numberOfFibroids?: string | number;
  fibroidsLocation?: string;
  fibroidsSize?: string;
  fibroidStagesFigo?: string;

  // TVS Cavity & Anomalies
  tvsEndometrialCavity?: string;
  endometrialMyometrialJunction?: string;
  septateFinding?: string;
  endometrialCavitySeptateAngle?: string | number;
  endometrialCavityLengthOfSeptum?: string | number;
  bicornuateUterus?: string;
  bicornuateUterusRightVolume?: string | number;
  bicornuateUterusLeftVolume?: string | number;
  unicornuateUterus?: string;
  unicornuateUterusVolume?: string | number;
  polypFinding?: string;
  numberOfPolyps?: string | number;
  dimensionsOfPolyps?: string;

  // TVS Ovaries & AFC
  afcRightOvary?: string | number;
  afcLeftOvary?: string | number;
  totalAntralFollicleCount?: string | number;
  rightOvaryDimensions?: string;
  leftOvaryDimensions?: string;
  endometriomaFinding?: string;
  numberOfEndometriomas?: string | number;
  folliclesAccessible?: string | number;
  folliclesInaccessible?: string | number;
  endometriomaRightOvaryDimensions?: string;
  endometriomaLeftOvaryDimensions?: string;

  // TVS Ovarian Cysts
  ovarianDermoidFinding?: string;
  rightOvaryDermoidDimensions?: string;
  leftOvaryDermoidDimensions?: string;
  haemorrhagicCystFinding?: string;
  rightOvaryHaemorrhagicDimensions?: string;
  leftOvaryHaemorrhagicDimensions?: string;
  corpusLuteumFinding?: string;
  corpusLuteumRightDimensions?: string;
  corpusLuteumLeftDimensions?: string;
  paroOvarianCystFinding?: string;
  paroOvarianRightDimensions?: string;
  paroOvarianLeftDimensions?: string;
  otherOvarianCyst?: string;
  otherOvarianCystDimensions?: string;

  // Fallopian Tube Findings
  hydrosalpinxFinding?: string;
  hydrosalpinxLeftDimensions?: string;
  hydrosalpinxRightDimensions?: string;
  haematosalpinxFinding?: string;
  haematosalpinxDimensions?: string;
}

export const initialAiimsInvestigationUltrasoundData: Readonly<AiimsInvestigationUltrasoundData> = Object.freeze({
  hasData: false,
});

export function useInvestigationUltrasound(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID
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
      investigationUltrasoundData: initialAiimsInvestigationUltrasoundData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  // TVS Uterus & Endometrium
  const dayOfCycle = getOptionalObsValue(CONCEPTS.dayOfCycle);
  const uterineSizeLength = getOptionalObsValue(CONCEPTS.uterineSizeLength);
  const uterineSizeWidth = getOptionalObsValue(CONCEPTS.uterineSizeWidth);
  const uterineSizeTransverseDiameter = getOptionalObsValue(CONCEPTS.uterineSizeTransverseDiameter);
  const uterineSizeVolume = getOptionalObsValue(CONCEPTS.uterineSizeVolume);
  const day1416EndometrialThickness = getOptionalObsValue(CONCEPTS.day1416EndometrialThickness);
  const day1416EndometrialPattern = getOptionalObsValue(CONCEPTS.day1416EndometrialPattern);
  const endometrialVascularity = getOptionalObsValue(CONCEPTS.endometrialVascularity);
  const adenomyosisTvsFinding = getOptionalObsValue(CONCEPTS.adenomyosisTvsFinding);
  const focalAdenomyomaDimensions = getOptionalObsValue(CONCEPTS.focalAdenomyomaDimensions);
  const uterineCalcifications = getOptionalObsValue(CONCEPTS.uterineCalcifications);

  // TVS Fibroids
  const fibroidsPresent = getOptionalObsValue(CONCEPTS.fibroidsPresent);
  const numberOfFibroids = getOptionalObsValue(CONCEPTS.numberOfFibroids);
  const fibroidsLocation = getOptionalObsValue(CONCEPTS.fibroidsLocation);
  const fibroidsSize = getOptionalObsValue(CONCEPTS.fibroidsSize);
  const fibroidStagesFigo = getOptionalObsValue(CONCEPTS.fibroidStagesFigo);

  // TVS Cavity & Anomalies
  const tvsEndometrialCavity = getOptionalObsValue(CONCEPTS.tvsEndometrialCavity);
  const endometrialMyometrialJunction = getOptionalObsValue(CONCEPTS.endometrialMyometrialJunction);
  const septateFinding = getOptionalObsValue(CONCEPTS.septateFinding);
  const endometrialCavitySeptateAngle = getOptionalObsValue(CONCEPTS.endometrialCavitySeptateAngle);
  const endometrialCavityLengthOfSeptum = getOptionalObsValue(CONCEPTS.endometrialCavityLengthOfSeptum);
  const bicornuateUterus = getOptionalObsValue(CONCEPTS.bicornuateUterus);
  const bicornuateUterusRightVolume = getOptionalObsValue(CONCEPTS.bicornuateUterusRightVolume);
  const bicornuateUterusLeftVolume = getOptionalObsValue(CONCEPTS.bicornuateUterusLeftVolume);
  const unicornuateUterus = getOptionalObsValue(CONCEPTS.unicornuateUterus);
  const unicornuateUterusVolume = getOptionalObsValue(CONCEPTS.unicornuateUterusVolume);
  const polypFinding = getOptionalObsValue(CONCEPTS.polypFinding);
  const numberOfPolyps = getOptionalObsValue(CONCEPTS.numberOfPolyps);
  const dimensionsOfPolyps = getOptionalObsValue(CONCEPTS.dimensionsOfPolyps);

  // TVS Ovaries & AFC
  const afcRightOvary = getOptionalObsValue(CONCEPTS.afcRightOvary);
  const afcLeftOvary = getOptionalObsValue(CONCEPTS.afcLeftOvary);
  const totalAntralFollicleCount = getOptionalObsValue(CONCEPTS.totalAntralFollicleCount);
  const rightOvaryDimensions = getOptionalObsValue(CONCEPTS.rightOvaryDimensions);
  const leftOvaryDimensions = getOptionalObsValue(CONCEPTS.leftOvaryDimensions);
  const endometriomaFinding = getOptionalObsValue(CONCEPTS.endometriomaFinding);
  const numberOfEndometriomas = getOptionalObsValue(CONCEPTS.numberOfEndometriomas);
  const folliclesAccessible = getOptionalObsValue(CONCEPTS.folliclesAccessible);
  const folliclesInaccessible = getOptionalObsValue(CONCEPTS.folliclesInaccessible);
  const endometriomaRightOvaryDimensions = getOptionalObsValue(CONCEPTS.endometriomaRightOvaryDimensions);
  const endometriomaLeftOvaryDimensions = getOptionalObsValue(CONCEPTS.endometriomaLeftOvaryDimensions);

  // TVS Cysts
  const ovarianDermoidFinding = getOptionalObsValue(CONCEPTS.ovarianDermoidFinding);
  const rightOvaryDermoidDimensions = getOptionalObsValue(CONCEPTS.rightOvaryDermoidDimensions);
  const leftOvaryDermoidDimensions = getOptionalObsValue(CONCEPTS.leftOvaryDermoidDimensions);
  const haemorrhagicCystFinding = getOptionalObsValue(CONCEPTS.haemorrhagicCystFinding);
  const rightOvaryHaemorrhagicDimensions = getOptionalObsValue(CONCEPTS.rightOvaryHaemorrhagicDimensions);
  const leftOvaryHaemorrhagicDimensions = getOptionalObsValue(CONCEPTS.leftOvaryHaemorrhagicDimensions);
  const corpusLuteumFinding = getOptionalObsValue(CONCEPTS.corpusLuteumFinding);
  const corpusLuteumRightDimensions = getOptionalObsValue(CONCEPTS.corpusLuteumRightDimensions);
  const corpusLuteumLeftDimensions = getOptionalObsValue(CONCEPTS.corpusLuteumLeftDimensions);
  const paroOvarianCystFinding = getOptionalObsValue(CONCEPTS.paroOvarianCystFinding);
  const paroOvarianRightDimensions = getOptionalObsValue(CONCEPTS.paroOvarianRightDimensions);
  const paroOvarianLeftDimensions = getOptionalObsValue(CONCEPTS.paroOvarianLeftDimensions);
  const otherOvarianCyst = getOptionalObsValue(CONCEPTS.otherOvarianCyst);
  const otherOvarianCystDimensions = getOptionalObsValue(CONCEPTS.otherOvarianCystDimensions);

  // Fallopian Tube
  const hydrosalpinxFinding = getOptionalObsValue(CONCEPTS.hydrosalpinxFinding);
  const hydrosalpinxLeftDimensions = getOptionalObsValue(CONCEPTS.hydrosalpinxLeftDimensions);
  const hydrosalpinxRightDimensions = getOptionalObsValue(CONCEPTS.hydrosalpinxRightDimensions);
  const haematosalpinxFinding = getOptionalObsValue(CONCEPTS.haematosalpinxFinding);
  const haematosalpinxDimensions = getOptionalObsValue(CONCEPTS.haematosalpinxDimensions);

  const hasData =
    dayOfCycle !== undefined ||
    uterineSizeLength !== undefined ||
    uterineSizeWidth !== undefined ||
    uterineSizeTransverseDiameter !== undefined ||
    uterineSizeVolume !== undefined ||
    day1416EndometrialThickness !== undefined ||
    day1416EndometrialPattern !== undefined ||
    endometrialVascularity !== undefined ||
    adenomyosisTvsFinding !== undefined ||
    focalAdenomyomaDimensions !== undefined ||
    uterineCalcifications !== undefined ||
    fibroidsPresent !== undefined ||
    numberOfFibroids !== undefined ||
    fibroidsLocation !== undefined ||
    fibroidsSize !== undefined ||
    fibroidStagesFigo !== undefined ||
    tvsEndometrialCavity !== undefined ||
    endometrialMyometrialJunction !== undefined ||
    septateFinding !== undefined ||
    endometrialCavitySeptateAngle !== undefined ||
    endometrialCavityLengthOfSeptum !== undefined ||
    bicornuateUterus !== undefined ||
    bicornuateUterusRightVolume !== undefined ||
    bicornuateUterusLeftVolume !== undefined ||
    unicornuateUterus !== undefined ||
    unicornuateUterusVolume !== undefined ||
    polypFinding !== undefined ||
    numberOfPolyps !== undefined ||
    dimensionsOfPolyps !== undefined ||
    afcRightOvary !== undefined ||
    afcLeftOvary !== undefined ||
    totalAntralFollicleCount !== undefined ||
    rightOvaryDimensions !== undefined ||
    leftOvaryDimensions !== undefined ||
    endometriomaFinding !== undefined ||
    numberOfEndometriomas !== undefined ||
    folliclesAccessible !== undefined ||
    folliclesInaccessible !== undefined ||
    endometriomaRightOvaryDimensions !== undefined ||
    endometriomaLeftOvaryDimensions !== undefined ||
    ovarianDermoidFinding !== undefined ||
    rightOvaryDermoidDimensions !== undefined ||
    leftOvaryDermoidDimensions !== undefined ||
    haemorrhagicCystFinding !== undefined ||
    rightOvaryHaemorrhagicDimensions !== undefined ||
    leftOvaryHaemorrhagicDimensions !== undefined ||
    corpusLuteumFinding !== undefined ||
    corpusLuteumRightDimensions !== undefined ||
    corpusLuteumLeftDimensions !== undefined ||
    paroOvarianCystFinding !== undefined ||
    paroOvarianRightDimensions !== undefined ||
    paroOvarianLeftDimensions !== undefined ||
    otherOvarianCyst !== undefined ||
    otherOvarianCystDimensions !== undefined ||
    hydrosalpinxFinding !== undefined ||
    hydrosalpinxLeftDimensions !== undefined ||
    hydrosalpinxRightDimensions !== undefined ||
    haematosalpinxFinding !== undefined ||
    haematosalpinxDimensions !== undefined;

  const investigationUltrasoundData: AiimsInvestigationUltrasoundData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    dayOfCycle,
    uterineSizeLength,
    uterineSizeWidth,
    uterineSizeTransverseDiameter,
    uterineSizeVolume,
    day1416EndometrialThickness,
    day1416EndometrialPattern,
    endometrialVascularity,
    adenomyosisTvsFinding,
    focalAdenomyomaDimensions,
    uterineCalcifications,
    fibroidsPresent,
    numberOfFibroids,
    fibroidsLocation,
    fibroidsSize,
    fibroidStagesFigo,
    tvsEndometrialCavity,
    endometrialMyometrialJunction,
    septateFinding,
    endometrialCavitySeptateAngle,
    endometrialCavityLengthOfSeptum,
    bicornuateUterus,
    bicornuateUterusRightVolume,
    bicornuateUterusLeftVolume,
    unicornuateUterus,
    unicornuateUterusVolume,
    polypFinding,
    numberOfPolyps,
    dimensionsOfPolyps,
    afcRightOvary,
    afcLeftOvary,
    totalAntralFollicleCount,
    rightOvaryDimensions,
    leftOvaryDimensions,
    endometriomaFinding,
    numberOfEndometriomas,
    folliclesAccessible,
    folliclesInaccessible,
    endometriomaRightOvaryDimensions,
    endometriomaLeftOvaryDimensions,
    ovarianDermoidFinding,
    rightOvaryDermoidDimensions,
    leftOvaryDermoidDimensions,
    haemorrhagicCystFinding,
    rightOvaryHaemorrhagicDimensions,
    leftOvaryHaemorrhagicDimensions,
    corpusLuteumFinding,
    corpusLuteumRightDimensions,
    corpusLuteumLeftDimensions,
    paroOvarianCystFinding,
    paroOvarianRightDimensions,
    paroOvarianLeftDimensions,
    otherOvarianCyst,
    otherOvarianCystDimensions,
    hydrosalpinxFinding,
    hydrosalpinxLeftDimensions,
    hydrosalpinxRightDimensions,
    haematosalpinxFinding,
    haematosalpinxDimensions,
  };

  return {
    investigationUltrasoundData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
