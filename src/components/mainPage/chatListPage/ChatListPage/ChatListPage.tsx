import React, { useState } from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { NewChatButton } from '../NewChatButton';

import styles from './ChatListPage.module.scss';

const ChatListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Layout className={styles.main}>
        <Header value={searchTerm} setSearchTerm={setSearchTerm}/>
        <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <NewChatButton />
    </Layout>
  );
};

export default ChatListPage;
