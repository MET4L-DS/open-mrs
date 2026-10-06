import React from 'react';
import { Cut, Activity, ReportData, Waveform, Events, Scalpel } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsFemaleSurgicalProcedureData } from './female-surgical-procedure.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface FemaleSurgicalProcedureCardProps {
  data: AiimsFemaleSurgicalProcedureData;
}

export const FemaleSurgicalProcedureCard: React.FC<FemaleSurgicalProcedureCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const cmUnit = t('unitCm', 'cm');
  const cm3Unit = t('unitCm3', 'cm³');
  const mmUnit = t('unitMm', 'mm');
  const degreesUnit = t('unitDegrees', 'degrees');

  // 1. Hysteroscopy Findings
  const hysteroscopyRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'hysteroscopy_ostia',
      label: t('hysteroscopyOstia', 'Ostia'),
      value: data.hysteroscopyOstia,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_endometrium',
      label: t('hysteroscopyEndometrium', 'Endometrium'),
      value: data.hysteroscopyEndometrium,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_endometrial_cavity',
      label: t('hysteroscopyEndometrialCavity', 'Endometrial Cavity'),
      value: data.hysteroscopyEndometrialCavity,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_cervical_direction',
      label: t('hysteroscopyCervicalCanalDirection', 'Cervical Canal Direction'),
      value: data.hysteroscopyCervicalCanalDirection,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_dimensions',
      label: t('hysteroscopyDimensions', 'Hysteroscopy Dimensions'),
      value: data.hysteroscopyDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'operative_hysteroscopy',
      label: t('operativeHysteroscopy', 'Operative Hysteroscopy'),
      value: data.operativeHysteroscopy,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 2. TVS Uterine Size & Adenomyosis
  const uterineRows: ObservationRow[] = React.useMemo(() => [
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
      id: 'day_of_cycle',
      label: t('dayOfCycle', 'Day of Cycle'),
      value: data.dayOfCycle,
      emptyPlaceholder: '—',
    },
    {
      id: 'adenomyosis_tvs',
      label: t('adenomyosisTvsFinding', 'Adenomyosis'),
      value: data.adenomyosisTvsFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'uterine_calcifications',
      label: t('uterineCalcifications', 'Calcifications'),
      value: data.uterineCalcifications,
      emptyPlaceholder: '—',
    },
    {
      id: 'focal_adenomyoma_dimensions',
      label: t('focalAdenomyomaDimensions', 'Focal Adenomyoma Dimensions'),
      value: data.focalAdenomyomaDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t, cmUnit, cm3Unit]);

  // 3. TVS Fibroids
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
      label: t('fibroidsLocation', 'Fibroids Location'),
      value: data.fibroidsLocation,
      emptyPlaceholder: '—',
    },
    {
      id: 'fibroids_size',
      label: t('fibroidsSize', 'Fibroids Size'),
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

  // 4. TVS Endometrial Cavity & Anomalies
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
      id: 'endometrial_cavity_septate_angle',
      label: t('endometrialCavitySeptateAngle', 'Septate Angle'),
      value: data.endometrialCavitySeptateAngle !== undefined ? `${data.endometrialCavitySeptateAngle} ${degreesUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrial_cavity_length_of_septum',
      label: t('endometrialCavityLengthOfSeptum', 'Length of Septum'),
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
      id: 'bicornuate_uterus_right_volume',
      label: t('bicornuateUterusRightVolume', 'Bicornuate Right Volume'),
      value: data.bicornuateUterusRightVolume !== undefined ? `${data.bicornuateUterusRightVolume} ${cm3Unit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'bicornuate_uterus_left_volume',
      label: t('bicornuateUterusLeftVolume', 'Bicornuate Left Volume'),
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
      id: 'unicornuate_uterus_volume',
      label: t('unicornuateUterusVolume', 'Unicornuate Uterus Volume'),
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

  // 5. TVS Ovaries, AFC & Endometrioma
  const ovarianRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'afc_right_ovary',
      label: t('afcRightOvary', 'Antral Follicle Count - Right'),
      value: data.afcRightOvary,
      emptyPlaceholder: '—',
    },
    {
      id: 'afc_left_ovary',
      label: t('afcLeftOvary', 'Antral Follicle Count - Left'),
      value: data.afcLeftOvary,
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
      id: 'endometrioma_right_ovary_dimensions',
      label: t('endometriomaRightOvaryDimensions', 'Endometrioma Right Dimensions'),
      value: data.endometriomaRightOvaryDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'endometrioma_left_ovary_dimensions',
      label: t('endometriomaLeftOvaryDimensions', 'Endometrioma Left Dimensions'),
      value: data.endometriomaLeftOvaryDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 6. TVS Hydrosalpinx, Cysts & Endometrial Thickness
  const cystRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'hydrosalpinx_finding',
      label: t('hydrosalpinxFinding', 'Hydrosalpinx'),
      value: data.hydrosalpinxFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'hydrosalpinx_dimensions',
      label: t('hydrosalpinxDimensions', 'Hydrosalpinx Dimensions'),
      value: data.hydrosalpinxDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'day14_16_endometrial_thickness',
      label: t('day1416EndometrialThickness', 'Day 14-16 Endometrial Thickness'),
      value: data.day1416EndometrialThickness !== undefined ? `${data.day1416EndometrialThickness} ${mmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'day14_16_endometrial_pattern',
      label: t('day1416EndometrialPattern', 'Day 14-16 Endometrial Pattern'),
      value: data.day1416EndometrialPattern,
      emptyPlaceholder: '—',
    },
    {
      id: 'ovarian_dermoid_finding',
      label: t('ovarianDermoidFinding', 'Ovarian Dermoid'),
      value: data.ovarianDermoidFinding,
      emptyPlaceholder: '—',
    },
    {
      id: 'right_ovary_dermoid_dimensions',
      label: t('rightOvaryDermoidDimensions', 'Right Dermoid Dimensions'),
      value: data.rightOvaryDermoidDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'left_ovary_dermoid_dimensions',
      label: t('leftOvaryDermoidDimensions', 'Left Dermoid Dimensions'),
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
      label: t('rightOvaryHaemorrhagicDimensions', 'Right Haemorrhagic Cyst Dimensions'),
      value: data.rightOvaryHaemorrhagicDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'left_ovary_haemorrhagic_dimensions',
      label: t('leftOvaryHaemorrhagicDimensions', 'Left Haemorrhagic Cyst Dimensions'),
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
      label: t('corpusLuteumRightDimensions', 'Right Corpus Luteum Dimensions'),
      value: data.corpusLuteumRightDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'corpus_luteum_left_dimensions',
      label: t('corpusLuteumLeftDimensions', 'Left Corpus Luteum Dimensions'),
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
      label: t('paroOvarianRightDimensions', 'Right Paro-ovarian Cyst Dimensions'),
      value: data.paroOvarianRightDimensions,
      emptyPlaceholder: '—',
    },
    {
      id: 'paro_ovarian_left_dimensions',
      label: t('paroOvarianLeftDimensions', 'Left Paro-ovarian Cyst Dimensions'),
      value: data.paroOvarianLeftDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t, mmUnit]);

  // 7. Endometrial Zones & Remarks
  const zoneRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'zone_1_dimensions',
      label: t('zone1Dimensions', 'Zone 1 (Myometrium surrounding endometrium)'),
      value: data.zone1Dimensions !== undefined ? `${data.zone1Dimensions} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'zone_2_dimensions',
      label: t('zone2Dimensions', 'Zone 2 (Hyperechoic endometrial edge)'),
      value: data.zone2Dimensions !== undefined ? `${data.zone2Dimensions} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'zone_3_dimensions',
      label: t('zone3Dimensions', 'Zone 3 (Internal endometrial hypoechoic zone)'),
      value: data.zone3Dimensions !== undefined ? `${data.zone3Dimensions} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'zone_4_dimensions',
      label: t('zone4Dimensions', 'Zone 4 (Endometrial cavity)'),
      value: data.zone4Dimensions !== undefined ? `${data.zone4Dimensions} ${cmUnit}` : undefined,
      emptyPlaceholder: '—',
    },
    {
      id: 'female_surgical_procedure_remarks',
      label: t('femaleSurgicalProcedureRemarks', 'Remarks / Notes'),
      value: data.femaleSurgicalProcedureRemarks,
      emptyPlaceholder: '—',
    },
  ], [data, t, cmUnit]);

  return (
    <div className={styles.grid}>
      <ObservationCard
        title={t('hysteroscopyFindingsTitle', 'Hysteroscopy Findings')}
        icon={Cut}
        rows={hysteroscopyRows}
      />
      <ObservationCard
        title={t('tvsUterineAdenomyosisTitle', 'TVS Uterine Size & Adenomyosis')}
        icon={Activity}
        rows={uterineRows}
      />
      <ObservationCard
        title={t('tvsFibroidsTitle', 'TVS Fibroids')}
        icon={ReportData}
        rows={fibroidRows}
      />
      <ObservationCard
        title={t('tvsCavityAnomaliesTitle', 'TVS Endometrial Cavity & Anomalies')}
        icon={Scalpel}
        rows={cavityRows}
      />
      <ObservationCard
        title={t('tvsOvariesAfcTitle', 'TVS Ovaries, AFC & Endometrioma')}
        icon={Events}
        rows={ovarianRows}
      />
      <ObservationCard
        title={t('tvsHydrosalpinxCystsTitle', 'TVS Hydrosalpinx, Cysts & Endometrial Thickness')}
        icon={Waveform}
        rows={cystRows}
      />
      <ObservationCard
        title={t('endometrialZonesRemarksTitle', 'Endometrial Zones & Remarks')}
        icon={ReportData}
        rows={zoneRows}
      />
    </div>
  );
};
