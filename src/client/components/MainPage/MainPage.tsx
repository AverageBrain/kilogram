import React from 'react';
import { Layout } from 'antd';
import Splitter, { GutterTheme, SplitDirection } from '@devbookhq/splitter'

import { Header } from '../Header';
import { ChatsList } from '../ChatsList';
import { ActiveChat } from '../ActiveChat';
import { chats, chatList, findUserById } from '../../../mock';
import './MainPage.css';

const { Content } = Layout;

const MainPage: React.FC = () => {
  return (
    <Layout>
      <Content>
        <Splitter
          direction={SplitDirection.Horizontal}
          minWidths={[350, 500]}
          gutterTheme={GutterTheme.Light}
        >
          <div>
            <Header />
            <ChatsList chats={chatList}/>
          </div>
          <ActiveChat chat={chats[0]} activeUser={findUserById('1')}/>
        </Splitter>
      </Content>
    </Layout>
  );
}
export default MainPage;
