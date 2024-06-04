import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { observer } from 'mobx-react-lite';
import { ChatListPage } from '../../mainPage/chatListPage';
import { ChatPage, EmptyPanel } from '../../mainPage/chatPage';
import { chatsStore, messagesStore, userStore } from '../../../stores';

import styles from './MainPage.module.scss';
import { useTypeOfScreen } from '../../../hooks';

const { Content } = Layout;

const MainPage: React.FC = () => {
  const { selectedItem, loadItems: loadChats, setSelectedChat } = chatsStore;
  const { selectedUser, setSelectedUser } = userStore;
  const { resetItems } = messagesStore;

  const location = useLocation();

  const { isBigScreen } = useTypeOfScreen();

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedChat(undefined);
      setSelectedUser(undefined);
      resetItems();
    }
  };

  useEffect(() => {
    loadChats();

    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [location.pathname]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        {isBigScreen
          ? <Splitter className={styles.splitter}>
            <SplitterPanel size={35} minSize={25}>
              <ChatListPage />
            </SplitterPanel>
            <SplitterPanel size={65} minSize={55}>
              {selectedItem || selectedUser
                ? <ChatPage key={selectedItem?.id} />
                : <EmptyPanel />
              }
            </SplitterPanel>
          </Splitter>
          : selectedItem || selectedUser
            ? <ChatPage key={selectedItem?.id} />
            : <ChatListPage />
        }
      </Content>
    </Layout>
  );
};

export default observer(MainPage);
