import React from 'react';
import Modal from 'react-modal';
import { ModalHeader } from '../../commonComponents/header';
import { MainInfo } from '../../commonComponents/mainInfo'; 
import { AdditionalInfo } from './AdditionalInfo';
import { UserType } from '../../../../../types';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const UserProfile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => {
  return (
    <Modal 
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      closeTimeoutMS={500}>
        <div className="profile-modal">
          <ModalHeader toggle={closeModal} title="Информация о пользователе"/>
          <MainInfo 
              name={user.name} 
              description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
              avatarParams={{userId: user.id, size: 80}}
            />
          <AdditionalInfo user={user} />
        </div>
    </Modal>
  );
}
