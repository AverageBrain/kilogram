import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar as AvatarAD, Spin, Badge } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import { userStore } from '../../stores';
import { userApiClient } from '../../hands';
import styles from './Avatar.module.scss';

type Props = {
  userId?: number;
  size?: number;
  className?: string;
  userStatus?: boolean;
}

const Avatar: React.FC<Props> = ({ userId, size, className, userStatus }) => {
  const { avatarCache, loadAvatar } = userStore;

  const [image, setImage] = useState<string | undefined>(undefined);

  const avatarSize = size ?? 40;

  useEffect(() => {
    const loadData = async () => {
      if (!image) {
        if (userId && avatarCache.has(userId)) {
          setImage(avatarCache.get(userId));
        } else if (userId) {
          const avatar = await loadAvatar(userId);
          if (avatar) {
            setImage(avatar);
          }
        }
      }
    };

    loadData();
  }, []);

  const avatarComponent = useMemo(() => (
  // TODO: настроить hitboxes
    <div className={clsx(styles.avatar, className)} style={{ width: avatarSize, height: avatarSize }}>
      {!userId && (
        <AvatarAD
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<CommentOutlined />}
          size={avatarSize}
        />
      )}
      {userId && (image
        ? <img alt='avatar' src={image} />
        : <AvatarAD icon={<UserOutlined />} size={avatarSize} />)
      }
    </div>
  ), [image]);

  return (
    <>
      {userStatus
        ? (
          <Badge
            size={avatarSize < 80 ? 'small' : undefined}
            count=" "
            offset={[-0.125 * avatarSize, 0.875 * avatarSize]}
            color="var(--base-accent-color)"
          >
            {avatarComponent}
          </Badge>
        )
        : avatarComponent
      }
    </>
  );
}

export default observer(Avatar);
