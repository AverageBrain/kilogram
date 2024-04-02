import React from 'react';
import { UserType } from '../../../../types';
import { AdditionalInfoItem } from './AdditionalInfoItem'; 
import './AdditionalInfo.css'
import { InfoCircleOutlined } from '@ant-design/icons';

type Props = {
  user: UserType;
}

export const AdditionalInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className='additional-info'>
      <div className='info-icon'>
        <InfoCircleOutlined style={{ fontSize: '20px' }}/>
      </div>
      <div className='additional-info-list'>
        <AdditionalInfoItem value={user.username} description='Username'/>
        <AdditionalInfoItem value='Здесь описание профиля' description='Описание'/>
      </div>
    </div>
  );
}
