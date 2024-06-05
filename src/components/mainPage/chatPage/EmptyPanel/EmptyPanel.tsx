import React from 'react';

import styles from './EmptyPanel.module.scss';

const EmptyPanel: React.FC = () => (
  <div className={styles.panel}>
    <div className={styles['start-text']}>
      <span>Выберите чат, чтобы начать переписку</span>
    </div>
  </div>
);

export default EmptyPanel;
