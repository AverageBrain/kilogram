import React from 'react';
import { Layout } from 'antd';
import Splitter, { GutterTheme, SplitDirection } from '@devbookhq/splitter'

import { chats, findUserById } from '../../../mock';
import { ChatListPage } from '../chatListPage';
import { ChatPage } from '../chatPage';
import './MainPage.css';

const { Content } = Layout;

const MainPage: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Splitter
          direction={SplitDirection.Horizontal}
          minWidths={[350, 500]}
          gutterTheme={GutterTheme.Light}
          draggerClassName="dragger"
        >
          <ChatListPage activeUser={findUserById('1')}/>
          <ChatPage chat={chats[0]} activeUser={findUserById('1')}/>
        </Splitter>
      </Content>
    </Layout>
  );
}

export default MainPage;
