import React from 'react';
import Modal from '../../commonComponents/modal';
import { NewMessageMain } from './components/NewMessageMain';
import { ModalHeader } from '../../commonComponents/header';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

export const NewMessageModal: React.FC<Props> = ({ isOpenModal, closeModal }) =>  (
  <Modal 
    modalType='big'
    isOpenModal={isOpenModal} 
    closeModal={closeModal}
  >
      <ModalHeader toggle={closeModal} title='Новое сообщение'/>
      <NewMessageMain closeModal={closeModal}/>
  </Modal>
);
