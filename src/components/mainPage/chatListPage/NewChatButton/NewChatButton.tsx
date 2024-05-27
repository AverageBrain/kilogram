import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { FaUser, FaUsers } from 'react-icons/fa';
import clsx from 'clsx';

import { NewMessageModal, NewGroupModal } from '../../../modals';

import { useComponentVisible, useModal } from '../../../../hooks';
import styles from './NewChatButton.module.scss';
import animationsStyles from '../../../../styles/animations.module.scss';

export const NewChatButton: React.FC = () => {
  const [firstTime, setFirstTime] = useState(true);

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

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
    setIsComponentVisible(!isComponentVisible);
  };

  const handleNewMessageClick = () => {
    setIsComponentVisible(false);
    showNewMessageModal();
  };

  const handleNewGroupClick = () => {
    setIsComponentVisible(false);
    showNewGroupModal();
  };

  return (
    <div className={styles['new-chat-buttons']}  ref={ref}>
      {!firstTime &&
        <>
          <div
            className={
              clsx(
                styles['extra-buttons'],
                styles['new-message'],
                !isComponentVisible ? animationsStyles['hide-new-chat-button'] : animationsStyles['show-new-chat-button'],
              )}
            onClick={handleNewMessageClick}
          >
            <FaUser size={20}/>
          </div>
          <div
            className={
              clsx(
                styles['extra-buttons'],
                styles['new-group'],
                !isComponentVisible ? animationsStyles['hide-new-group-button'] : animationsStyles['show-new-group-button'],
              )}
            onClick={handleNewGroupClick}
          >
            <FaUsers size={20}/>
          </div>
        </>
      }
      <div className={styles['main-button']} onClick={handleClick}>
        {isComponentVisible
          ? <IoClose className={clsx(styles.close, !firstTime && animationsStyles.rotate)} size={40} />
          : <HiPencil className={clsx(styles.pencil, !firstTime && animationsStyles.rotate)} size={25} />
        }
      </div>
      <NewMessageModal isOpenModal={isOpenNewMessageModal} closeModal={closeNewMessageModal} />
      <NewGroupModal isOpenModal={isOpenNewGroupModal} closeModal={closeNewGroupModal} />
    </div>
  );
};
