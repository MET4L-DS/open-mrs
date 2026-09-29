import React from 'react';
import { Activity } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsFemaleFactorData } from './female-factor.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface FemaleFactorCardProps {
  data: AiimsFemaleFactorData;
}

export const FemaleFactorCard: React.FC<FemaleFactorCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const primaryFactorsDisplay = React.useMemo(() => {
    if (!data.femaleFactors || data.femaleFactors.length === 0) {
      return undefined;
    }
    return (
      <div className={styles.tagList}>
        {data.femaleFactors.map(factor => (
          <Tag key={factor} type="teal" size="sm">
            {factor}
          </Tag>
        ))}
      </div>
    );
  }, [data.femaleFactors]);

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('femaleInfertilityFactor', 'Female Infertility Factors'),
        value: primaryFactorsDisplay,
      },
    ];

    if (data.tubalFactorDetails && data.tubalFactorDetails.length > 0) {
      list.push({
        label: t('tubalFactorDetails', 'Tubal Factor Findings'),
        value: data.tubalFactorDetails.join(', '),
      });
    }

    if (data.dorDetails) {
      const dorDisplay = data.poseidonGroup
        ? `${data.dorDetails} (${data.poseidonGroup})`
        : data.dorDetails;
      list.push({
        label: t('dorDetails', 'Diminished Ovarian Reserve'),
        value: dorDisplay,
      });
    }

    if (data.endometriosisClassification && data.endometriosisClassification.length > 0) {
      list.push({
        label: t('endometriosisClassification', 'Endometriosis Classification'),
        value: data.endometriosisClassification.join(', '),
      });
    }

    if (data.pcosPhenotype) {
      list.push({
        label: t('pcosPhenotype', 'PCOS Phenotype'),
        value: data.pcosPhenotype,
      });
    }

    if (data.uterineFactorDetails && data.uterineFactorDetails.length > 0) {
      list.push({
        label: t('uterineFactorDetails', 'Uterine Factor Findings'),
        value: data.uterineFactorDetails.join(', '),
      });
    }

    if (data.otherFemaleFactors && data.otherFemaleFactors.length > 0) {
      list.push({
        label: t('otherFemaleFactors', 'Other Factors'),
        value: data.otherFemaleFactors.join(', '),
      });
    }

    if (data.femaleFactorOthers) {
      list.push({
        label: t('femaleFactorOthers', 'Clinical Notes'),
        value: data.femaleFactorOthers,
      });
    }

    return list;
  }, [
    data.tubalFactorDetails,
    data.dorDetails,
    data.poseidonGroup,
    data.endometriosisClassification,
    data.pcosPhenotype,
    data.uterineFactorDetails,
    data.otherFemaleFactors,
    data.femaleFactorOthers,
    primaryFactorsDisplay,
    t,
  ]);

  return (
    <ObservationCard
      title={t('femaleFactorDetails', 'Female Factor Infertility Details')}
      icon={Activity}
      rows={rows}
    />
  );
};
