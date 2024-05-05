import React from 'react';
import './MainInfo.css'
import { Avatar } from '../../../Avatar';
import { Divider } from '../divider';

type AvatarParams = {
  userId?: number;
  size?: number;
}

type Props = {
  name: string;
  description: string;
  avatarParams?: AvatarParams;
}

export const MainInfo: React.FC<Props> = ({ name, description, avatarParams }) => {

  return (
    <>
      <div className='main-info'>
        <div className='avatar'>
          <Avatar userId={avatarParams?.userId} size={80} />
        </div>
        <div className='text-info'>
          <span className='name'>{name}</span>
          <span className='description'>
            {description}
          </span>
        </div>
      </div>
      <Divider />
    </>
  );
}
