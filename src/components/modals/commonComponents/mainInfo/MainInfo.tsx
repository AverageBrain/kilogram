import React from 'react';
import {Avatar} from '../../../Avatar';
import {Divider} from '../divider';
import styles from './MainInfo.module.scss';

type AvatarParams = {
  userId?: number;
  size?: number;
  userStatus?: boolean;
  availableForUpdate?: boolean;
};

type Props = {
  name: string;
  description: string;
  avatarParams?: AvatarParams;
};

export const MainInfo: React.FC<Props> = ({ name, description, avatarParams }) => (
  <>
    <div className={styles['main-info']}>
      <div className={styles.avatar}>
        <Avatar {...avatarParams} />
      </div>
      <div className={styles['text-info']}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>
          {description}
        </span>
      </div>
    </div>
    <Divider />
  </>
);
