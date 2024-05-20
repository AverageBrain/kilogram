import React, { memo, useEffect, useState } from 'react';
import { Avatar as AvatarD, Spin } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { userApiClient } from '../../hands';
import styles from './Avatar.module.scss';

type Props = {
  userId?: number;
  size?: number;
}

// TODO: подумать, как не загружать постоянно аватарки, тк, например, для каждого сообщения не загружать заново
const Avatar: React.FC<Props> = ({ userId, size }) => {
  const [ photoStatus, setPhotoStatus ] = useState('loading');
  const [ image, setImage ] = useState('');

  const avatarSize = size ?? 40;

  useEffect(() => {
    if (userId) {
     userApiClient.getAvatar(userId)
      .then(response => {
        setImage(response);
        setPhotoStatus('loaded');
      })
      .catch(error => {
          setPhotoStatus('error-occurred');
          console.error('Error occurred while getting an avatar:', error)
        }
      )
    } else {
      setPhotoStatus('default-avatar');
    }
  }, [])

  return (
  // TODO: настроить hitboxes
    <div className={styles.avatar} style={{ width: avatarSize, height: avatarSize}}>
      {photoStatus === 'loading' && <Spin className={styles.spin} />}
      {photoStatus === 'loaded' && <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />}
      {photoStatus === 'error-occurred' && <AvatarD icon={<UserOutlined />} size={avatarSize} />}
      {photoStatus === 'default-avatar' && <AvatarD
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<CommentOutlined />}
          size={avatarSize}
        />
      }
    </div>
  );
}

export default memo(Avatar);
