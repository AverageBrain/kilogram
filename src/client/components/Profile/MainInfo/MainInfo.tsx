import React from 'react';
import { UserType } from '../../../../types';
import { Avatar } from 'antd';
import './MainInfo.css'
import { UserOutlined } from '@ant-design/icons';

type Props = {
  user: UserType;
}

export const MainInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className='main-info'>
      <div className='avatar'>
        <Avatar size={80} icon={<UserOutlined />} />
      </div>
      <div className='text-info'>
        <span className='name'>{user.name}</span>
        <span className='last-seen'>онлайн</span>
      </div>
    </div>
  );
}
