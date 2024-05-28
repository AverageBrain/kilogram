import React from 'react';

import { ModalHeader } from '../../commonComponents/header';
import { UserType } from '../../../../types';
import { UserModalMain } from './UserMainModal';
import Modal from '../../commonComponents/modal';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  closeModal: () => void;
};

export const UserProfile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => (
    <Modal
      modalType="big"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
        <ModalHeader toggle={closeModal} title="Информация о пользователе"/>
        <UserModalMain user={user} closeModal={closeModal}/>
    </Modal>
);
