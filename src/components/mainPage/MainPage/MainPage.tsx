/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { ChatListPage } from '../chatListPage';
import { ChatPage, EmptyPanel } from '../chatPage';
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
          ? (
            <div className={styles.splitter}>
              <div className={clsx(styles.sidebar, styles['splitter-panel'])}>
                <ChatListPage />
              </div>
              <div className={clsx(styles['main-panel'], styles['splitter-panel'])}>
                {selectedItem || selectedUser
                  ? <ChatPage key={selectedItem?.id} />
                  : <EmptyPanel />}
              </div>
            </div>)
          : selectedItem || selectedUser
            ? <ChatPage key={selectedItem?.id} />
            : <ChatListPage />}
      </Content>
    </Layout>
  );
};

export default observer(MainPage);
