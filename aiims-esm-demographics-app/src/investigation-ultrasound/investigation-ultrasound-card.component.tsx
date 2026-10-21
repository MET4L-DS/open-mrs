import React from 'react';
import { Waveform } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsInvestigationUltrasoundData } from './investigation-ultrasound.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface InvestigationUltrasoundCardProps {
  data: AiimsInvestigationUltrasoundData;
}

export const InvestigationUltrasoundCard: React.FC<InvestigationUltrasoundCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const cmUnit = t('unitCm', 'cm');
  const cm3Unit = t('unitCm3', 'cm³');
  const mmUnit = t('unitMm', 'mm');
  const degreesUnit = t('unitDegrees', 'degrees');

  // 1. TVS Uterine Size & Endometrial Findings (Exact Sequence 1-11)
  const uterineRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'day_of_cycle',
      label: t('dayOfCycle', 'Day of Cycle'),
      value: data.dayOfCycle,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_size_length',
      label: t('uterineSizeLength', 'Length'),
      value: data.uterineSizeLength !== undefined ? `${data.uterineSizeLength} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_size_width',
      label: t('uterineSizeWidth', 'Width'),
      value: data.uterineSizeWidth !== undefined ? `${data.uterineSizeWidth} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_size_transverse',
      label: t('uterineSizeTransverseDiameter', 'Transverse Diameter'),
      value: data.uterineSizeTransverseDiameter !== undefined ? `${data.uterineSizeTransverseDiameter} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_size_volume',
      label: t('uterineSizeVolume', 'Volume'),
      value: data.uterineSizeVolume !== undefined ? `${data.uterineSizeVolume} ${cm3Unit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'day14_16_endometrial_thickness',
      label: t('day1416EndometrialThickness', 'Day 14–16 Endometrial Thickness'),
      value: data.day1416EndometrialThickness !== undefined ? `${data.day1416EndometrialThickness} ${mmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'day14_16_endometrial_pattern',
      label: t('day1416EndometrialPattern', 'Day 14–16 Pattern'),
      value: data.day1416EndometrialPattern,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrial_vascularity',
      label: t('endometrialVascularity', 'Endometrial Vascularity'),
      value: data.endometrialVascularity,
      emptyPlaceholder: '—',
    },
    {
      id: 'adenomyosis_tvs',
      label: t('adenomyosisTvsFinding', 'Adenomyosis'),
      value: data.adenomyosisTvsFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'focal_adenomyoma_dimensions',
      label: t('focalAdenomyomaDimensions', 'Focal Adenomyoma Dimensions'),
      value: data.focalAdenomyomaDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_calcifications',
      label: t('uterineCalcifications', 'Calcifications'),
      value: data.uterineCalcifications,
      emptyPlaceholder: '—',
    },
  ], [data, t, cmUnit, cm3Unit, mmUnit]);

  // 2. TVS Fibroids (Sequence 12-16)
  const fibroidRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'fibroids_present',
      label: t('fibroidsPresent', 'Fibroids'),
      value: data.fibroidsPresent,
      emptyPlaceholder: '—',
    },
    {
      id: 'number_of_fibroids',
      label: t('numberOfFibroids', 'Number of Fibroids'),
      value: data.numberOfFibroids,
      emptyPlaceholder: '—',
    },
    {
      id: 'fibroids_location',
      label: t('fibroidsLocation', 'Location'),
      value: data.fibroidsLocation,
      emptyPlaceholder: '—',
    },
    {
      id: 'fibroids_size',
      label: t('fibroidsSize', 'Size'),
      value: data.fibroidsSize,
      emptyPlaceholder: '—',
    },
    {
      id: 'fibroid_stages_figo',
      label: t('fibroidStagesFigo', 'FIGO Stage'),
      value: data.fibroidStagesFigo,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 3. TVS Cavity & Anomalies (Sequence 17-30)
  const cavityRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'tvs_endometrial_cavity',
      label: t('tvsEndometrialCavity', 'Endometrial Cavity'),
      value: data.tvsEndometrialCavity,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrial_myometrial_junction',
      label: t('endometrialMyometrialJunction', 'Endometrial-Myometrial Junction'),
      value: data.endometrialMyometrialJunction,
      emptyPlaceholder: '—',
    },
    {
      id: 'septate_finding',
      label: t('septateFinding', 'Septate Finding'),
      value: data.septateFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'septate_angle',
      label: t('endometrialCavitySeptateAngle', 'Endometrial Cavity Septate Angle'),
      value: data.endometrialCavitySeptateAngle !== undefined ? `${data.endometrialCavitySeptateAngle} ${degreesUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'length_of_septum',
      label: t('endometrialCavityLengthOfSeptum', 'Endometrial Cavity Length of Septum'),
      value: data.endometrialCavityLengthOfSeptum !== undefined ? `${data.endometrialCavityLengthOfSeptum} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'bicornuate_uterus',
      label: t('bicornuateUterus', 'Bicornuate Uterus'),
      value: data.bicornuateUterus,
      emptyPlaceholder: '—',
    },
    {
      id: 'bicornuate_right_volume',
      label: t('bicornuateRightVolume', 'Bicornuate Right Volume'),
      value: data.bicornuateUterusRightVolume !== undefined ? `${data.bicornuateUterusRightVolume} ${cm3Unit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'bicornuate_left_volume',
      label: t('bicornuateLeftVolume', 'Bicornuate Left Volume'),
      value: data.bicornuateUterusLeftVolume !== undefined ? `${data.bicornuateUterusLeftVolume} ${cm3Unit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'unicornuate_uterus',
      label: t('unicornuateUterus', 'Unicornuate Uterus'),
      value: data.unicornuateUterus,
      emptyPlaceholder: '—',
    },
    {
      id: 'unicornuate_volume',
      label: t('unicornuateVolume', 'Unicornuate Volume'),
      value: data.unicornuateUterusVolume !== undefined ? `${data.unicornuateUterusVolume} ${cm3Unit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'polyp_finding',
      label: t('polypFinding', 'Polyp'),
      value: data.polypFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'number_of_polyps',
      label: t('numberOfPolyps', 'Number of Polyps'),
      value: data.numberOfPolyps,
      emptyPlaceholder: '—',
    },
    {
      id: 'dimensions_of_polyps',
      label: t('dimensionsOfPolyps', 'Dimensions of Polyps'),
      value: data.dimensionsOfPolyps,
      emptyPlaceholder: '—',
    },
  ], [data, t, cmUnit, cm3Unit, degreesUnit]);

  // 4. TVS Ovaries & AFC (Sequence 31-41)
  const ovaryRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'afc_right_ovary',
      label: t('afcRightOvary', 'Right AFC'),
      value: data.afcRightOvary,
      emptyPlaceholder: '—',
    },
    {
      id: 'afc_left_ovary',
      label: t('afcLeftOvary', 'Left AFC'),
      value: data.afcLeftOvary,
      emptyPlaceholder: '—',
    },
    {
      id: 'total_antral_follicle_count',
      label: t('totalAntralFollicleCount', 'Total Antral Follicle Count'),
      value: data.totalAntralFollicleCount !== undefined ? String(data.totalAntralFollicleCount) : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'right_ovary_dimensions',
      label: t('rightOvaryDimensions', 'Right Ovary Dimensions'),
      value: data.rightOvaryDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'left_ovary_dimensions',
      label: t('leftOvaryDimensions', 'Left Ovary Dimensions'),
      value: data.leftOvaryDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrioma_finding',
      label: t('endometriomaFinding', 'Endometrioma'),
      value: data.endometriomaFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'number_of_endometriomas',
      label: t('numberOfEndometriomas', 'Number of Endometriomas'),
      value: data.numberOfEndometriomas,
      emptyPlaceholder: '—',
    },
    {
      id: 'follicles_accessible',
      label: t('folliclesAccessible', 'Follicles Accessible'),
      value: data.folliclesAccessible,
      emptyPlaceholder: '—',
    },
    {
      id: 'follicles_inaccessible',
      label: t('folliclesInaccessible', 'Follicles Inaccessible'),
      value: data.folliclesInaccessible,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrioma_right_dimensions',
      label: t('endometriomaRightDimensions', 'Right Endometrioma Size'),
      value: data.endometriomaRightOvaryDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrioma_left_dimensions',
      label: t('endometriomaLeftDimensions', 'Left Endometrioma Size'),
      value: data.endometriomaLeftOvaryDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 5. TVS Ovarian Cysts (Sequence 42-55)
  const cystRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'ovarian_dermoid_finding',
      label: t('ovarianDermoidFinding', 'Ovarian Dermoid'),
      value: data.ovarianDermoidFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'right_ovary_dermoid_dimensions',
      label: t('rightOvaryDermoidDimensions', 'Right Dermoid Size'),
      value: data.rightOvaryDermoidDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'left_ovary_dermoid_dimensions',
      label: t('leftOvaryDermoidDimensions', 'Left Dermoid Size'),
      value: data.leftOvaryDermoidDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'haemorrhagic_cyst_finding',
      label: t('haemorrhagicCystFinding', 'Haemorrhagic Cyst'),
      value: data.haemorrhagicCystFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'right_ovary_haemorrhagic_dimensions',
      label: t('rightOvaryHaemorrhagicDimensions', 'Right Haemorrhagic Size'),
      value: data.rightOvaryHaemorrhagicDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'left_ovary_haemorrhagic_dimensions',
      label: t('leftOvaryHaemorrhagicDimensions', 'Left Haemorrhagic Size'),
      value: data.leftOvaryHaemorrhagicDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'corpus_luteum_finding',
      label: t('corpusLuteumFinding', 'Corpus Luteum'),
      value: data.corpusLuteumFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'corpus_luteum_right_dimensions',
      label: t('corpusLuteumRightDimensions', 'Right Corpus Luteum Size'),
      value: data.corpusLuteumRightDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'corpus_luteum_left_dimensions',
      label: t('corpusLuteumLeftDimensions', 'Left Corpus Luteum Size'),
      value: data.corpusLuteumLeftDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'paro_ovarian_cyst_finding',
      label: t('paroOvarianCystFinding', 'Paro-ovarian Cyst'),
      value: data.paroOvarianCystFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'paro_ovarian_right_dimensions',
      label: t('paroOvarianRightDimensions', 'Right Paro-ovarian Size'),
      value: data.paroOvarianRightDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'paro_ovarian_left_dimensions',
      label: t('paroOvarianLeftDimensions', 'Left Paro-ovarian Size'),
      value: data.paroOvarianLeftDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'other_ovarian_cyst',
      label: t('otherOvarianCyst', 'Other Cyst'),
      value: data.otherOvarianCyst,
      emptyPlaceholder: '—',
    },
    {
      id: 'other_ovarian_cyst_dimensions',
      label: t('otherOvarianCystDimensions', 'Other Cyst Dimensions'),
      value: data.otherOvarianCystDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 6. Fallopian Tube (Sequence 56-60)
  const fallopianTubeRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'hydrosalpinx_finding',
      label: t('hydrosalpinxFinding', 'Hydrosalpinx'),
      value: data.hydrosalpinxFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'hydrosalpinx_left_dimensions',
      label: t('hydrosalpinxLeftDimensions', 'Left Hydrosalpinx Dimensions'),
      value: data.hydrosalpinxLeftDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'hydrosalpinx_right_dimensions',
      label: t('hydrosalpinxRightDimensions', 'Right Hydrosalpinx Dimensions'),
      value: data.hydrosalpinxRightDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'haematosalpinx_finding',
      label: t('haematosalpinxFinding', 'Haematosalpinx'),
      value: data.haematosalpinxFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'haematosalpinx_dimensions',
      label: t('haematosalpinxDimensions', 'Haematosalpinx Dimensions'),
      value: data.haematosalpinxDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  const allRows = React.useMemo(() => [
    ...uterineRows,
    ...fibroidRows,
    ...cavityRows,
    ...ovaryRows,
    ...cystRows,
    ...fallopianTubeRows,
  ], [
    uterineRows,
    fibroidRows,
    cavityRows,
    ovaryRows,
    cystRows,
    fallopianTubeRows,
  ]);

  return (
    <ObservationCard
      title={t('aiimsInvestigationFemaleTransvaginalUltrasoundTitle', 'Investigation Female Transvaginal Ultrasound')}
      icon={Waveform}
      rows={allRows}
    />
  );
};
