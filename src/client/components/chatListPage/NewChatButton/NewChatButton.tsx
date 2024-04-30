import React, { useState } from 'react';
import { HiPencil } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";

import './NewChatButton.css';
import clsx from 'clsx';
import { NewMessagePage } from '../../NewMessagePage';
import { useModal } from '../../../../hooks';

export const NewChatButton: React.FC = () => {
  const [ isClicked, setIsClicked ] = useState(false);
  const [ firstTime, setFirstTime ] = useState(true);

  const { 
    isOpenModal: isNewMessageModal, 
    showModal: showNewMessageModal, 
    closeModal: closeNewMessageModal 
  } = useModal();

  const { 
    isOpenModal: isNewgroupModal, 
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

  return (
    <div className='new-chat-buttons'>
      { !firstTime && 
        <>
          <div className={clsx('extra-buttons', 'new-message', isClicked ? 'show-new-chat-button' : 'hide-new-chat-button')}
              onClick={handleNewMessageClick}>
            <FaUser size={20}/>
          </div>
          <div className={clsx('extra-buttons', 'new-group', isClicked ? 'show-new-group-button' : 'hide-new-group-button')}
              >
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
      <NewMessagePage isOpenModal={isNewMessageModal} closeModal={closeNewMessageModal} />
    </div>
  );
};
