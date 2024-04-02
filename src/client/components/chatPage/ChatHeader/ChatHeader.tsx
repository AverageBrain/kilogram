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
        <div className="user-name" onClick={showModal}>
          {chat.user.name}
        </div>
      </HeaderAD>

      <Profile user={chat.user} isOpenModal={isOpenModal} toggle={closeModal} />
    </>
  );
};

export default ChatHeader;
