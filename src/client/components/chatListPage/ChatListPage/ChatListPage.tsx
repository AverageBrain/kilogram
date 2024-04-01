import React from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { chatList } from '../../../../mock';
import './ChatListPage.css';

const ChatListPage: React.FC = () => {
  return (
    <Layout className='main'>
        <Header />
        <ChatList chats={chatList}/>
    </Layout>
  );
};

export default ChatListPage;
