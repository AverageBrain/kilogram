import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { UserType } from '../../../../../../types';
import { AdditionalInfoItem } from './AdditionalInfoItem';

import styles from './AdditionalInfo.module.scss';

type Props = {
  user: UserType;
};

export const AdditionalInfo: React.FC<Props> = ({ user }) => (
  <div className={styles['additional-info']}>
    <div className={styles['info-icon']}>
      <InfoCircleOutlined style={{ fontSize: '20px' }} />
    </div>
    <div className={styles['additional-info-list']}>
      <AdditionalInfoItem value={user.username} description="Username" />
      {user.bio && <AdditionalInfoItem value={user.bio} description="Описание" />}
    </div>
  </div>
);
