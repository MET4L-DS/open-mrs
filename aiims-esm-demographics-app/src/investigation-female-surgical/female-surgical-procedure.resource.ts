import { AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsFemaleSurgicalProcedureData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;

  // Hysteroscopy
  hysteroscopyOstia?: string;
  hysteroscopyEndometrium?: string;
  hysteroscopyEndometrialCavity?: string;
  hysteroscopyCervicalCanalDirection?: string;
  hysteroscopyDimensions?: string;
  operativeHysteroscopy?: string;

  // TVS Uterine Size & Adenomyosis
  uterineSizeLength?: string | number;
  uterineSizeWidth?: string | number;
  uterineSizeTransverseDiameter?: string | number;
  uterineSizeVolume?: string | number;
  dayOfCycle?: string | number;
  adenomyosisTvsFinding?: string;
  uterineCalcifications?: string;
  focalAdenomyomaDimensions?: string;

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
  rightOvaryDimensions?: string;
  leftOvaryDimensions?: string;
  endometriomaFinding?: string;
  numberOfEndometriomas?: string | number;
  folliclesAccessible?: string | number;
  folliclesInaccessible?: string | number;
  endometriomaRightOvaryDimensions?: string;
  endometriomaLeftOvaryDimensions?: string;

  // TVS Hydrosalpinx & Endometrial Thickness
  hydrosalpinxFinding?: string;
  hydrosalpinxDimensions?: string;
  day1416EndometrialThickness?: string | number;
  day1416EndometrialPattern?: string;

  // TVS Cysts
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

  // Endometrial Zones
  zone1Dimensions?: string | number;
  zone2Dimensions?: string | number;
  zone3Dimensions?: string | number;
  zone4Dimensions?: string | number;

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

  // Hysteroscopy
  const hysteroscopyOstia = getOptionalObsValue(CONCEPTS.hysteroscopyOstia);
  const hysteroscopyEndometrium = getOptionalObsValue(CONCEPTS.hysteroscopyEndometrium);
  const hysteroscopyEndometrialCavity = getOptionalObsValue(CONCEPTS.hysteroscopyEndometrialCavity);
  const hysteroscopyCervicalCanalDirection = getOptionalObsValue(CONCEPTS.hysteroscopyCervicalCanalDirection);
  const hysteroscopyDimensions = getOptionalObsValue(CONCEPTS.hysteroscopyDimensions);
  const operativeHysteroscopy = getOptionalObsValue(CONCEPTS.operativeHysteroscopy);

  // TVS Uterine Size & Adenomyosis
  const uterineSizeLength = getOptionalObsValue(CONCEPTS.uterineSizeLength);
  const uterineSizeWidth = getOptionalObsValue(CONCEPTS.uterineSizeWidth);
  const uterineSizeTransverseDiameter = getOptionalObsValue(CONCEPTS.uterineSizeTransverseDiameter);
  const uterineSizeVolume = getOptionalObsValue(CONCEPTS.uterineSizeVolume);
  const dayOfCycle = getOptionalObsValue(CONCEPTS.dayOfCycle);
  const adenomyosisTvsFinding = getOptionalObsValue(CONCEPTS.adenomyosisTvsFinding);
  const uterineCalcifications = getOptionalObsValue(CONCEPTS.uterineCalcifications);
  const focalAdenomyomaDimensions = getOptionalObsValue(CONCEPTS.focalAdenomyomaDimensions);

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
  const rightOvaryDimensions = getOptionalObsValue(CONCEPTS.rightOvaryDimensions);
  const leftOvaryDimensions = getOptionalObsValue(CONCEPTS.leftOvaryDimensions);
  const endometriomaFinding = getOptionalObsValue(CONCEPTS.endometriomaFinding);
  const numberOfEndometriomas = getOptionalObsValue(CONCEPTS.numberOfEndometriomas);
  const folliclesAccessible = getOptionalObsValue(CONCEPTS.folliclesAccessible);
  const folliclesInaccessible = getOptionalObsValue(CONCEPTS.folliclesInaccessible);
  const endometriomaRightOvaryDimensions = getOptionalObsValue(CONCEPTS.endometriomaRightOvaryDimensions);
  const endometriomaLeftOvaryDimensions = getOptionalObsValue(CONCEPTS.endometriomaLeftOvaryDimensions);

  // TVS Hydrosalpinx & Endometrial Thickness
  const hydrosalpinxFinding = getOptionalObsValue(CONCEPTS.hydrosalpinxFinding);
  const hydrosalpinxDimensions = getOptionalObsValue(CONCEPTS.hydrosalpinxDimensions);
  const day1416EndometrialThickness = getOptionalObsValue(CONCEPTS.day1416EndometrialThickness);
  const day1416EndometrialPattern = getOptionalObsValue(CONCEPTS.day1416EndometrialPattern);

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

  // Endometrial Zones
  const zone1Dimensions = getOptionalObsValue(CONCEPTS.zone1Dimensions);
  const zone2Dimensions = getOptionalObsValue(CONCEPTS.zone2Dimensions);
  const zone3Dimensions = getOptionalObsValue(CONCEPTS.zone3Dimensions);
  const zone4Dimensions = getOptionalObsValue(CONCEPTS.zone4Dimensions);

  // Remarks
  const femaleSurgicalProcedureRemarks = getOptionalObsValue(CONCEPTS.femaleSurgicalProcedureRemarks);

  const hasData =
    hysteroscopyOstia !== undefined ||
    hysteroscopyEndometrium !== undefined ||
    hysteroscopyEndometrialCavity !== undefined ||
    hysteroscopyCervicalCanalDirection !== undefined ||
    hysteroscopyDimensions !== undefined ||
    operativeHysteroscopy !== undefined ||
    uterineSizeLength !== undefined ||
    uterineSizeWidth !== undefined ||
    uterineSizeTransverseDiameter !== undefined ||
    uterineSizeVolume !== undefined ||
    dayOfCycle !== undefined ||
    adenomyosisTvsFinding !== undefined ||
    uterineCalcifications !== undefined ||
    focalAdenomyomaDimensions !== undefined ||
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
    rightOvaryDimensions !== undefined ||
    leftOvaryDimensions !== undefined ||
    endometriomaFinding !== undefined ||
    numberOfEndometriomas !== undefined ||
    folliclesAccessible !== undefined ||
    folliclesInaccessible !== undefined ||
    endometriomaRightOvaryDimensions !== undefined ||
    endometriomaLeftOvaryDimensions !== undefined ||
    hydrosalpinxFinding !== undefined ||
    hydrosalpinxDimensions !== undefined ||
    day1416EndometrialThickness !== undefined ||
    day1416EndometrialPattern !== undefined ||
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
    zone1Dimensions !== undefined ||
    zone2Dimensions !== undefined ||
    zone3Dimensions !== undefined ||
    zone4Dimensions !== undefined ||
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
    uterineSizeLength,
    uterineSizeWidth,
    uterineSizeTransverseDiameter,
    uterineSizeVolume,
    dayOfCycle,
    adenomyosisTvsFinding,
    uterineCalcifications,
    focalAdenomyomaDimensions,
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
    rightOvaryDimensions,
    leftOvaryDimensions,
    endometriomaFinding,
    numberOfEndometriomas,
    folliclesAccessible,
    folliclesInaccessible,
    endometriomaRightOvaryDimensions,
    endometriomaLeftOvaryDimensions,
    hydrosalpinxFinding,
    hydrosalpinxDimensions,
    day1416EndometrialThickness,
    day1416EndometrialPattern,
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
    zone1Dimensions,
    zone2Dimensions,
    zone3Dimensions,
    zone4Dimensions,
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
