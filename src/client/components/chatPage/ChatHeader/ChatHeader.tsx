import React from 'react';
import { Layout } from 'antd';
import './ChatHeader.css'
import { useModal } from '../../../../hooks/useModal';
import { Profile } from '../../Profile';
import { observer } from 'mobx-react-lite';
import { chatsStore, userStore } from '../../../stores';

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC = () => {
  const { selectedItem: chat } = chatsStore;
  const { selectedUser: user } = userStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const curUser = chat ? chat.users[0] : user ? user : undefined;

  return curUser
    ? (
      <>
        <HeaderAD className='chat-header'>
          <div className='user-info' onClick={showModal}>
            <span className='user-name'>{curUser.name}</span>
            <span className='last-seen'>
              {curUser.lastSeen ? curUser.lastSeen : 'был в сети недавно'}
            </span>
          </div>
        </HeaderAD>

        <Profile user={curUser} isOpenModal={isOpenModal} toggle={closeModal} />
      </>
    )
    : <></>;
};

export default observer(ChatHeader);
