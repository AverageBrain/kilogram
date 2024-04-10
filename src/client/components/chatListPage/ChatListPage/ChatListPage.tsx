import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';

import { Header } from '../Header';
import { ChatList } from '../ChatList';
import { ChatListItemType, ChatType } from '../../../../types';
import './ChatListPage.css';

type Props = {
  activeChat: ChatType | null;
  setActiveChat: (chat: ChatType | null) => void;
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

export default observer(ChatListPage);
