import React from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { chatList } from '../../../../mock';
import './ChatListPage.css';
import { UserType } from '../../../../types';

type Props = {
  activeUser: UserType;
}

const ChatListPage: React.FC<Props> = ({ activeUser }) => {
  return (
    <Layout className='main'>
        <Header activeUser={activeUser}/>
        <ChatList chats={chatList}/>
    </Layout>
  );
};

export default ChatListPage;
