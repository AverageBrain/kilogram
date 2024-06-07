import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { FaUser, FaUsers } from 'react-icons/fa';
import clsx from 'clsx';
import { NewMessageModal, NewGroupModal } from '../../../modals';

import { useModal } from '../../../../hooks';

import styles from './NewChatButton.module.scss';
import animationsStyles from '../../../../styles/animations.module.scss';

export const NewChatButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const {
    isOpenModal: isOpenNewMessageModal,
    showModal: showNewMessageModal,
    closeModal: closeNewMessageModal,
  } = useModal();

  const {
    isOpenModal: isOpenNewGroupModal,
    showModal: showNewGroupModal,
    closeModal: closeNewGroupModal,
  } = useModal();

  const handleClick = () => {
    setFirstTime(false);
    setIsClicked(!isClicked);
  };

  const handleNewMessageClick = () => {
    setIsClicked(false);
    showNewMessageModal();
  };

  const handleNewGroupClick = () => {
    setIsClicked(false);
    showNewGroupModal();
  };

  return (
    <div className={styles['new-chat-buttons']}>
      { !firstTime
        && (
        <>
          <div
            className={
              clsx(
                styles['extra-buttons'],
                styles['new-message'],
                isClicked ? animationsStyles['show-new-chat-button'] : animationsStyles['hide-new-chat-button'],
              )
              }
            onClick={handleNewMessageClick}
          >
            <FaUser size={20} />
          </div>
          <div
            className={
              clsx(
                styles['extra-buttons'],
                styles['new-group'],
                isClicked ? animationsStyles['show-new-group-button'] : animationsStyles['hide-new-group-button'],
              )
}
            onClick={handleNewGroupClick}
          >
            <FaUsers size={20} />
          </div>
        </>
        )}
      <div className={styles['main-button']} onClick={handleClick}>
        { isClicked
          ? <IoClose className={clsx(styles.close, !firstTime && animationsStyles.rotate)} size={40} />
          : <HiPencil className={clsx(styles.pencil, !firstTime && animationsStyles.rotate)} size={25} />}
      </div>
      <NewMessageModal isOpenModal={isOpenNewMessageModal} closeModal={closeNewMessageModal} />
      <NewGroupModal isOpenModal={isOpenNewGroupModal} closeModal={closeNewGroupModal} />
    </div>
  );
};
