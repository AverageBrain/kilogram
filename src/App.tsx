import React from 'react';
import './App.css';

import { ActiveChat } from './client/components/ActiveChat';
import { chats } from './mock/chats'
import { findUserById } from './mock/chats' 
import { Layout } from 'antd';
import { ChatsList, Header } from './client/components';
import { chatList } from './mock/chatList';

function App() {
  return (
    <Layout>
      <main>
        <div className='chats-list'>
          <Header />
          <div className="border-right">
          <ChatsList chats={chatList}/>
          </div>
        </div>
        <ActiveChat chat={chats[0]} activeUser={findUserById('1')}/>
      </main>
    </Layout>
  );
}
export default App;
