import React from 'react';
import { ModalHeader } from '../../commonComponents/header';
import { UserType } from '../../../../types';
import { UserModalMain } from './UserMainModal';

import styles from '../../index.module.scss';
import Modal from '../../commonComponents/modal';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const UserProfile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => {
  return (
    <Modal 
      modalType='big'
      isOpenModal={isOpenModal} 
      closeModal={closeModal}
    >
        <ModalHeader toggle={closeModal} title="Информация о пользователе"/>
        <UserModalMain user={user} closeModal={closeModal}/>
    </Modal>
  );
}
