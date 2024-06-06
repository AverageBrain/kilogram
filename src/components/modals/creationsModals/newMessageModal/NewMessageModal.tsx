import React from 'react';
import Modal from '../../commonComponents/modal';
import { NewMessageMain } from './components/NewMessageMain';
import { ModalHeader } from '../../commonComponents/header';
import { useTypeOfScreen } from '../../../../hooks';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
};

export const NewMessageModal: React.FC<Props> = ({ isOpenModal, closeModal }) => {
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
        title="Новое сообщение"
      />
      <NewMessageMain closeModal={closeModal} />
    </Modal>
  );
};
