import React from 'react';
import { MainInfo } from '../../../commonComponents/mainInfo'; 
import { UserType } from '../../../../../../types';
import { AdditionalInfo } from './AdditionalInfo';
import { Divider } from '../../../commonComponents/divider';
import { WriteUserButton } from './WriteUserButton';
import { authApiClient } from '../../../../../hands';
import { authUserStore } from '../../../../../stores';

type Props = {
  user: UserType;
  closeModal: () => void;
}

export const UserModalMain: React.FC<Props> = ( { user, closeModal } ) => {
  const { selectedItem } = authUserStore;
  
  const isAuthUser = user === selectedItem;

  return (
    <React.Fragment>
      <MainInfo 
          name={user.name} 
          description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          avatarParams={{userId: user.id, size: 80}}
        />
      <AdditionalInfo user={user} />
      
      {!isAuthUser && <WriteUserButton user={user} closeModal={closeModal}/>}
    </React.Fragment>
  );
}
