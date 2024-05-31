import React from 'react';

import { ModalHeader } from '../../commonComponents/header';
import { UserType } from '../../../../types';
import { UserModalMain } from './UserMainModal';
import Modal from '../../commonComponents/modal';
import { useTypeOfScreen } from '../../../../hooks';

type Props = {
  user: UserType;
  isOpenModal: boolean;
  closeModal: () => void;
};

export const UserProfile: React.FC<Props> = ( { user, isOpenModal, closeModal } ) => {
  const { isHiddenModal } = useTypeOfScreen();

  return (
    <Modal
      modalType="big"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
        <ModalHeader
          handleClose={isHiddenModal ? undefined : closeModal}
          handleBack={isHiddenModal ? closeModal : undefined}
          title="Информация о пользователе"
        />
        <UserModalMain user={user} closeModal={closeModal}/>
    </Modal>
  );
};
