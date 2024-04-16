import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { observer } from 'mobx-react-lite';

import { ChatListPage } from '../chatListPage';
import { ChatPage, EmptyPanel } from '../chatPage';
import './MainPage.css';
import { chatsStore, messagesStore, userStore } from '../../stores';

const { Content } = Layout;

const MainPage: React.FC = () => {
  const { selectedItem, loadItems: loadChats, setSelectedChat } = chatsStore;
  const { selectedUser, setSelectedUser } = userStore;
  const { clearMessages } = messagesStore;

  const [panelSizes, setPanelSizes] = useState<number[]>([]); // TODO: можно записывать в localStorage

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedChat(undefined);
      setSelectedUser(undefined);
      clearMessages();
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
        <Splitter className='splitter'>
          <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={305}>
            <ChatListPage />
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={500}>
            {selectedItem || selectedUser
              ? <ChatPage key={selectedItem?.id} />
              : <EmptyPanel />
            }
          </SplitterPanel>
        </Splitter>
      </Content>
    </Layout>
  );
}

export default observer(MainPage);
