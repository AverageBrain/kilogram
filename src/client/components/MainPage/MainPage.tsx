import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Splitter, { GutterTheme, SplitDirection } from '@devbookhq/splitter'

import { ChatListPage } from '../chatListPage';
import { ChatPage, EmptyPanel } from '../chatPage';
import { ChatListItemType } from '../../../types';
import { findChatById, findUserById } from '../../../mock';
import './MainPage.css';

const { Content } = Layout;

const MainPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ChatListItemType | null>(null);

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveChat(null);
    }
  };

  useEffect(() => {
      document.addEventListener('keydown', handleEscapePress);

      return () => {
          document.removeEventListener('keydown', handleEscapePress);
      };
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Splitter
          direction={SplitDirection.Horizontal}
          minWidths={[350, 500]}
          gutterTheme={GutterTheme.Light}
          draggerClassName="dragger"
        >
          <ChatListPage
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
          {activeChat
          ? <ChatPage chat={findChatById(activeChat.id)} activeUser={findUserById('1')}/>
          : <EmptyPanel />
          }
        </Splitter>
      </Content>
    </Layout>
  );
}

export default MainPage;
