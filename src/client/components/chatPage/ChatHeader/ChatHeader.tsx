import React from 'react';
import { Layout } from 'antd';
import './ChatHeader.css'
import { useModal } from '../../../../hooks/useModal';
import { Profile } from '../../Profile';
import { observer } from 'mobx-react-lite';
import { chatsStore, userStore } from '../../../stores';
import { TypeOfChat } from '../../../../types/types';
import GroupProfile from '../../groupProfile';

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC = () => {
  const { selectedItem: chat } = chatsStore;
  const { selectedUser: user } = userStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const isGroup = !!chat && chat.type === TypeOfChat.Group;
  const curUser = chat ? chat.users[0] : user;

  return curUser
    ? (
      <>
        <HeaderAD className='chat-header'>
          <div className='user-info' onClick={showModal}>
            <span className='user-name'>{isGroup ? chat.name : curUser.name}</span>
            {!isGroup && (
              <span className='last-seen'>
                {curUser.lastSeen ? curUser.lastSeen : 'был в сети недавно'}
              </span>
            )}
          </div>
        </HeaderAD>
        {isGroup
          ? <GroupProfile group={chat} isOpenModal={isOpenModal} closeModal={closeModal} />
          : <Profile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
      </>
    )
    : <></>;
};

export default observer(ChatHeader);
