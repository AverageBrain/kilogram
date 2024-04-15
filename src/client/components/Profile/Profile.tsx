import React from 'react';
import Modal from 'react-modal'
import './Profile.css'
import { ProfileHeader } from './ProfileHeader'
import { MainInfo } from './MainInfo'; 
import { AdditionalInfo } from './AdditionalInfo';
import { UserType } from '../../../types';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  toggle: () => void;
}

export const Profile: React.FC<Props> = ( { user, isOpenModal, toggle } ) => {
  return (
    <Modal 
      isOpen={isOpenModal} 
      onRequestClose={toggle}
      closeTimeoutMS={500}>
        <div className={'profile-modal'}>
          <ProfileHeader toggle={toggle}/>
          <MainInfo user={user}/>
          <AdditionalInfo user={user} />

        </div>
    </Modal>
  );
}
