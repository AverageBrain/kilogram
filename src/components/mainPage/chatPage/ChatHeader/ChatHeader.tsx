import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import { useModal } from '../../../../hooks/useModal';
import { chatsStore, userStore } from '../../../../stores';
import { TypeOfChat } from '../../../../types/types';
import { GroupProfile, UserProfile } from '../../../modals';
import { getHandle } from '../../../../utils';

import styles from './ChatHeader.module.scss';

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC = () => {
  const { selectedItem: chat } = chatsStore;
  const { selectedUser: user } = userStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const isGroup = !!chat && chat.type === TypeOfChat.Group;
  const curUser = chat ? chat.users[0] : user;
  const membersCount = isGroup ? chat.users.length + 1 : undefined;

  return curUser
    ? (
      <>
        <HeaderAD className={styles['chat-header']}>
          <div className={styles.info} onClick={showModal}>
            <span className={styles.name}>{isGroup ? chat.name : curUser.name}</span>
            <span className={styles.description}>
              {getHandle({ isGroup, membersCount, user: curUser })}
            </span>
          </div>
        </HeaderAD>
        {isGroup
          ? <GroupProfile group={chat} isOpenModal={isOpenModal} closeModal={closeModal} />
          : <UserProfile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
      </>
    )
    : <></>;
};

export default observer(ChatHeader);
