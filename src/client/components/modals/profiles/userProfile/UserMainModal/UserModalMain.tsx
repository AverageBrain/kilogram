import React from 'react';
import { MainInfo } from '../../../commonComponents/mainInfo'; 
import { UserType } from '../../../../../../types';
import { AdditionalInfo } from './AdditionalInfo';
import { Divider } from '../../../commonComponents/divider';

type Props = {
  user: UserType;
}

export const UserModalMain: React.FC<Props> = ( { user } ) => {
  return (
    <React.Fragment>
      <MainInfo 
          name={user.name} 
          description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          avatarParams={{userId: user.id, size: 80}}
        />
      <AdditionalInfo user={user} />
    </React.Fragment>
  );
}
