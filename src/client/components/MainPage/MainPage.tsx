import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Splitter, { GutterTheme, SplitDirection } from '@devbookhq/splitter'

import { ChatListPage } from '../chatListPage';
import { ChatPage, EmptyPanel } from '../chatPage';
import { ChatListItemType, ChatType } from '../../../types';
import { findChatById } from '../../../mock';
import './MainPage.css';
import { chatsStore, messagesStore } from '../../stores';

const { Content } = Layout;

const MainPage: React.FC = () => {
  const { selectedItem, loadItems: loadChats, createChat } = chatsStore;
  const { loadItems: loadMessages, sendMessage } = messagesStore;

  const [activeChat, setActiveChat] = useState<ChatType | null>(null);
  const [panelSizes, setPanelSizes] = useState<number[]>([]); // TODO: можно записывать в localStorage

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveChat(null);
    }
  };

  useEffect(() => {
    loadChats();   

    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  const handleResizeFinished = (pairIdx: number, newSizes: number[]) => setPanelSizes(newSizes);
  const activeUserId = 1;

  return (
    <Layout style={{ height: "100vh" }}>
      <button onClick={async () => {
        sendMessage(2, 'aa');
      }}>click</button>
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
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
          {activeChat
            ? <ChatPage chat={findChatById(activeChat.id)} activeUserId={activeUserId}/>
            : <EmptyPanel />
          }
        </Splitter>
      </Content>
    </Layout>
  );
}

export default MainPage;
