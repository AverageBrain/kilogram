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
  closeModal: () => void;
}

export const Profile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => {
  return (
    <Modal 
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      closeTimeoutMS={500}>
        <div className={'profile-modal'}>
          <ProfileHeader toggle={closeModal}/>
          <MainInfo user={user}/>
          <AdditionalInfo user={user} />

        </div>
    </Modal>
  );
}
