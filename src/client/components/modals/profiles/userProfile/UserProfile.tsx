import React from 'react';
import Modal from 'react-modal';
import { ModalHeader } from '../../commonComponents/header';
import { UserType } from '../../../../../types';
import { UserModalMain } from './UserMainModal';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const UserProfile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => {
  return (
    <Modal 
      className="big-modal"
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      closeTimeoutMS={500}>
        <div className="profile-modal">
          <ModalHeader toggle={closeModal} title="Информация о пользователе"/>
          <UserModalMain user={user} />
        </div>
    </Modal>
  );
}
