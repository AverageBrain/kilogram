import React from 'react';
import { Layout } from 'antd';
import { useModal } from '../../../../hooks/useModal';
import { observer } from 'mobx-react-lite';
import { chatsStore, messagesStore, userStore } from '../../../../stores';
import { TypeOfChat } from '../../../../types/types';
import { GroupProfile, UserProfile } from '../../../modals';
import { getHandle } from '../../../../utils';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTypeOfScreen } from '../../../../hooks';
import { Avatar } from '../../../Avatar';

import styles from './ChatHeader.module.scss';
import buttonStyles from '../../../../styles/buttons.module.scss';
import clsx from 'clsx';

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC = () => {
  const { selectedItem: chat, setSelectedChat } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;
  const { resetItems } = messagesStore;

  const { isOpenModal, showModal, closeModal } = useModal();
  const { isBigScreen } = useTypeOfScreen();

  const isGroup = !!chat && chat.type === TypeOfChat.Group;
  const curUser = chat ? chat.users[0] : user;
  const membersCount = isGroup ? chat.users.length + 1 : undefined;

  const handleBack = () => {
    setSelectedChat(undefined);
    setSelectedUser(undefined);
    resetItems();
  };

  return (
    <>
      <HeaderAD className={styles['chat-header']}>
        {!isBigScreen &&
          <div className={clsx(buttonStyles['small-icon-svg-button'], styles['back-button'])} onClick={handleBack}>
            <ArrowLeftOutlined />
          </div>
        }
        <div className={styles.info} onClick={showModal}>
          {!isBigScreen && <Avatar />}
          <div className={styles['text-info']}>
            <span className={styles.name}>{isGroup ? chat.name : curUser?.name}</span>
            <span className={styles.description}>
              {getHandle({ isGroup, membersCount, user: curUser })}
            </span>
          </div>
        </div>
      </HeaderAD>
      {isGroup
        ? <GroupProfile group={chat} isOpenModal={isOpenModal} closeModal={closeModal} />
        : curUser && <UserProfile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
    </>
  );
};

export default observer(ChatHeader);
