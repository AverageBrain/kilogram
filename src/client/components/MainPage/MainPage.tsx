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
  const [panelSizes, setPanelSizes] = useState<number[]>([]); // TODO: можно записывать в localStorage

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

  const handleResizeFinished = (pairIdx: number, newSizes: number[]) => setPanelSizes(newSizes);
  const activeUser = findUserById('1');

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Splitter
          initialSizes={panelSizes}
          direction={SplitDirection.Horizontal}
          minWidths={[350, 500]}
          gutterTheme={GutterTheme.Light}
          draggerClassName="dragger"
          onResizeFinished={handleResizeFinished}
        >
          <ChatListPage
            activeUser={activeUser}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
          {activeChat
          ? <ChatPage chat={findChatById(activeChat.id)} activeUser={activeUser}/>
          : <EmptyPanel />
          }
        </Splitter>
      </Content>
    </Layout>
  );
}

export default MainPage;
