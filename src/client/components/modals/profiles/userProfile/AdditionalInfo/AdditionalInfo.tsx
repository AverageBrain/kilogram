import React from 'react';
import { UserType } from '../../../../../../types';
import { AdditionalInfoItem } from './AdditionalInfoItem'; 
import { InfoCircleOutlined } from '@ant-design/icons';

import './AdditionalInfo.css';

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
        {user.bio && <AdditionalInfoItem value={user.bio} description='Описание'/>}
      </div>
    </div>
  );
}
