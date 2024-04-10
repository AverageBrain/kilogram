import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Splitter, { GutterTheme, SplitDirection } from '@devbookhq/splitter'
import { observer } from 'mobx-react-lite';

import { ChatListPage } from '../chatListPage';
import { ChatPage, EmptyPanel } from '../chatPage';
import './MainPage.css';
import { chatsStore } from '../../stores';

const { Content } = Layout;

const MainPage: React.FC = () => {
  const { selectedItem, loadItems: loadChats, setSelectedChat } = chatsStore;

  const [panelSizes, setPanelSizes] = useState<number[]>([]); // TODO: можно записывать в localStorage

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedChat(undefined);
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
          <ChatListPage />
          {selectedItem
            ? <ChatPage />
            : <EmptyPanel />
          }
        </Splitter>
      </Content>
    </Layout>
  );
}

export default observer(MainPage);
