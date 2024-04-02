import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  toggle: () => void;
}

export const ProfileHeader: React.FC<Props> = ({ toggle }) => {
  return (
    <header>
      <div className='header-name'>Информация о пользователе</div>
      <div className='icon' onClick={toggle}><CloseOutlined /></div>
    </header>
  );
}
