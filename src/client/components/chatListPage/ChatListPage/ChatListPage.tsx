import React, { useState } from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';
import { ChatList } from '../ChatList';
import './ChatListPage.css';
import { NewChatButton } from '../NewChatButton/NewChatButton';

const ChatListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Layout className='main'>
        <Header value={searchTerm} setSearchTerm={setSearchTerm}/>
        <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <NewChatButton />
    </Layout>
  );
};

export default ChatListPage;
