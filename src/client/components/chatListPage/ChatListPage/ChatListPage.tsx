import React from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { ChatListItemType } from '../../../../types';
import './ChatListPage.css';
import { findUserById } from '../../../../mock';

type Props = {
  activeUserId: number;
  activeChat: ChatListItemType | null;
  setActiveChat: (chat: ChatListItemType | null) => void;
};

const ChatListPage: React.FC<Props> = ({ activeUserId, activeChat, setActiveChat }) => {
  const activeUser = findUserById(activeUserId);

  return (
    <Layout className='main'>
        <Header activeUser={activeUser}/>
        <ChatList
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
    </Layout>
  );
};

export default ChatListPage;
