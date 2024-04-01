import React from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { ChatListItemType } from '../../../../types';
import './ChatListPage.css';

type Props = {
  activeChat: ChatListItemType | null;
  setActiveChat: (chat: ChatListItemType | null) => void;
};

const ChatListPage: React.FC<Props> = ({ activeChat, setActiveChat }) => {
  return (
    <Layout className='main'>
        <Header />
        <ChatList
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
    </Layout>
  );
};

export default ChatListPage;
