import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Tile } from '@carbon/react';
import styles from './aiims-esm-demographics-app.scss';

const AiimsEsmDemographicsApp: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Layer>
        <Tile className={styles.tile}>
          <h1 className={styles.heading}>
            {t('aiimsEsmDemographicsAppHeading', 'AiimsEsmDemographicsApp')}
          </h1>
          <p className={styles.content}>
            {t('aiimsEsmDemographicsAppDescription', 'Welcome to the AiimsEsmDemographicsApp page.')}
          </p>
        </Tile>
      </Layer>
    </div>
  );
};

export default AiimsEsmDemographicsApp;