import React from 'react';

import styles from './AdditionalInfo.module.scss';

type Props = {
  value: string;
  description: string;
};

export const AdditionalInfoItem: React.FC<Props> = ({ value, description }) => (
    <div className={styles['additional-info-item']}>
      <div className={styles.value}>{value}</div>
      <div className={styles.description}>{description}</div>
    </div>
);
