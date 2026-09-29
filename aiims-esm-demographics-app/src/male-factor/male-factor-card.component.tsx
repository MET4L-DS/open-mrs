import React from 'react';
import { GenderMale } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsMaleFactorData } from './male-factor.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface MaleFactorCardProps {
  data: AiimsMaleFactorData;
}

export const MaleFactorCard: React.FC<MaleFactorCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const primaryFactorsDisplay = React.useMemo(() => {
    if (!data.maleFactors || data.maleFactors.length === 0) {
      return undefined;
    }
    return (
      <div className={styles.tagList}>
        {data.maleFactors.map(factor => (
          <Tag key={factor} type="teal" size="sm">
            {factor}
          </Tag>
        ))}
      </div>
    );
  }, [data.maleFactors]);

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('maleInfertilityFactor', 'Male Infertility Factors'),
        value: primaryFactorsDisplay,
      },
    ];

    if (data.azoospermiaDetails) {
      list.push({
        label: t('azoospermiaClassification', 'Azoospermia Classification'),
        value: data.azoospermiaDetails,
      });
    }

    if (data.maleFactorOthers) {
      list.push({
        label: t('maleFactorOthers', 'Clinical Notes'),
        value: data.maleFactorOthers,
      });
    }

    return list;
  }, [data.azoospermiaDetails, data.maleFactorOthers, primaryFactorsDisplay, t]);

  return (
    <ObservationCard
      title={t('maleFactorDetails', 'Male Factor Infertility Details')}
      icon={GenderMale}
      rows={rows}
    />
  );
};
