import React from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';
import { ChatList } from '../ChatList';
import './ChatListPage.css';


const ChatListPage: React.FC = () => {
  return (
    <Layout className='main'>
        <Header />
        <ChatList />
    </Layout>
  );
};

export default ChatListPage;
