import React from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { chatList } from '../../../../mock';

const ChatListPage: React.FC = () => {
  return (
    <Layout>
        <Header />
        <ChatList chats={chatList}/>
    </Layout>
  );
};

export default ChatListPage;
