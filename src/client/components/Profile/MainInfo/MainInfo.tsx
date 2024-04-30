import React from 'react';
import { UserType } from '../../../../types';
import './MainInfo.css'
import { Avatar } from '../../Avatar';

type Props = {
  user: UserType;
}

export const MainInfo: React.FC<Props> = ({ user }) => {

  return (
    <div className='main-info'>
      <div className='avatar'>
        <Avatar user={user} />
      </div>
      <div className='text-info'>
        <span className='name'>{user.name}</span>
        <span className='last-seen'>
          {user.lastSeen? user.lastSeen : 'был в сети недавно'}
        </span>
      </div>
    </div>
  );
}
