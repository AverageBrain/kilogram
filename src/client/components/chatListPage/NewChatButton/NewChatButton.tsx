import React, { useState } from 'react';
import { HiPencil } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";

import './NewChatButton.css';
import clsx from 'clsx';
import { NewMessageModal } from '../../modals';
import { NewGroupModal } from '../../modals';
import { useModal } from '../../../../hooks';

export const NewChatButton: React.FC = () => {
  const [ isClicked, setIsClicked ] = useState(false);
  const [ firstTime, setFirstTime ] = useState(true);

  const { 
    isOpenModal: isOpenNewMessageModal, 
    showModal: showNewMessageModal, 
    closeModal: closeNewMessageModal 
  } = useModal();

  const { 
    isOpenModal: isOpenNewGroupModal, 
    showModal: showNewGroupModal, 
    closeModal: closeNewGroupModal 
  } = useModal();

  const handleClick = () => {
    setFirstTime(false);
    setIsClicked(!isClicked);
  };  

  const handleNewMessageClick = () => {
    setIsClicked(false); 
    showNewMessageModal();
  }

  const handleNewGroupClick = () => {
    setIsClicked(false); 
    showNewGroupModal();
  }

  return (
    <div className='new-chat-buttons'>
      { !firstTime && 
        <>
          <div className={clsx('extra-buttons', 'new-message', isClicked ? 'show-new-chat-button' : 'hide-new-chat-button')}
              onClick={handleNewMessageClick}>
            <FaUser size={20}/>
          </div>
          <div className={clsx('extra-buttons', 'new-group', isClicked ? 'show-new-group-button' : 'hide-new-group-button')}
              onClick={handleNewGroupClick}>
            <FaUsers size={20}/>
          </div>
        </>
      }
      <div className='main-button' onClick={handleClick}>
        { isClicked ? 
          <IoClose  className={clsx('close', !firstTime && 'rotate')} size={40} /> :
          <HiPencil className={clsx('pencil', !firstTime && 'rotate')} size={25}/>
        }
      </div>
      <NewMessageModal isOpenModal={isOpenNewMessageModal} closeModal={closeNewMessageModal} />
      <NewGroupModal isOpenModal={isOpenNewGroupModal} closeModal={closeNewGroupModal} />
    </div>
  );
};
