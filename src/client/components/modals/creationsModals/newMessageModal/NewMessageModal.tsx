import React from 'react';
import Modal from 'react-modal';
import { NewMessageMain } from './components/NewMessageMain';

import './NewMessageModal.css';
import { ModalHeader } from '../../commonComponents/header';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

export const NewMessageModal: React.FC<Props> = ({ isOpenModal, closeModal }) =>  (
  <Modal 
    className="big-modal"
    isOpen={isOpenModal} 
    onRequestClose={closeModal}
    closeTimeoutMS={500}
  >
      <div className="new-message-page">
        <ModalHeader toggle={closeModal} title='Новое сообщение'/>
        <NewMessageMain closeModal={closeModal}/>
      </div>
  </Modal>
);
