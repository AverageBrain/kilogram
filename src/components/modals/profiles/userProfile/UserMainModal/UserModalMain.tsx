import React from 'react';
import { MainInfo } from '../../../commonComponents/mainInfo'; 
import { UserType } from '../../../../../types';
import { AdditionalInfo } from './AdditionalInfo';
import { WriteUserButton } from './WriteUserButton';
import { authUserStore } from '../../../../../stores';

type Props = {
  user: UserType;
  closeModal: () => void;
}

export const UserModalMain: React.FC<Props> = ( { user, closeModal } ) => {
  const { selectedItem } = authUserStore;
  
  const isAuthUser = user === selectedItem;

  return (
    <>
      <MainInfo 
          name={user.name} 
          description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          avatarParams={{userId: user.id, size: 80}}
        />
      <AdditionalInfo user={user} />
      
      {!isAuthUser && <WriteUserButton user={user} closeModal={closeModal}/>}
    </>
  );
}
