import React from 'react';
import { Layout } from 'antd';
import { ChatType } from '../../../../types'
import './ChatHeader.css'
import { useModal } from '../../../../hooks/useModal';
import { Profile } from '../../Profile';

type Props = {
  chat: ChatType;
}

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC<Props> = ({ chat }) => {
  const { isOpenModal, showModal, closeModal } = useModal();

  return (
    <>
      <HeaderAD className='chat-header'>
        <div className='user-info' onClick={showModal}>
          <span className='user-name'>{chat.user.name}</span>
          <span className='last-seen'>
            {chat.user.lastSeen ? chat.user.lastSeen : 'был в сети недавно'}
          </span>
        </div>
      </HeaderAD>

      <Profile user={chat.user} isOpenModal={isOpenModal} toggle={closeModal} />
    </>
  );
};

export default ChatHeader;
