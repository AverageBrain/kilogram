import React, { useState } from 'react';
import Modal from 'react-modal';

import './NewMessagePage.css';
import { NewMessagePageHeader } from './components/NewMessagePageHeader';
import { NewMessageMain } from './components/NewMessageMain';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

export const NewMessagePage: React.FC<Props> = ({ isOpenModal, closeModal }) =>  (
  <Modal 
    className="modal"
    isOpen={isOpenModal} 
    onRequestClose={closeModal}
    closeTimeoutMS={500}>
      <div className="new-message-page">
        <NewMessagePageHeader closeModal={closeModal} isOpenModal={isOpenModal}/>
        <NewMessageMain closeModal={closeModal}/>
      </div>
  </Modal>
);
