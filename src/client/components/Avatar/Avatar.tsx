import React, { memo, useEffect, useState } from 'react';
import { UserType } from '../../../types';
import { Avatar as AvatarD, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userApiClient } from '../../hands';
import './Avatar.css';

type Props = {
  user: UserType;
}

// TODO: подумать, как не загружать постоянно аватарки
const Avatar: React.FC<Props> = ({ user }) => {
  const [ photoStatus, setPhotoStatus ] = useState('loading');
  const [ image, setImage ] = useState('');

  useEffect(() => {
    userApiClient.getAvatar(user.username)
      .then(response => {
        setImage(response);
        setPhotoStatus('loaded');
      })
      .catch(error => {
          setPhotoStatus('error-occurred');
          console.error('Error occurred while getting an avatar:', error)
        }
      )
  }, [])

  return (
// TODO: настроить hitboxes
    <>
      {photoStatus === 'loading' && <div style={{ width: '40px', height: '40px' }}><Spin /></div>}
      {photoStatus === 'loaded' && <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />}
      {photoStatus === 'error-occurred' && <AvatarD icon={<UserOutlined />} />}
    </>
  );
}

export default memo(Avatar);
