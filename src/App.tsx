import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import { ChatList, Header } from './client/components';
import { chatList } from './mock/chatList';

function App() {
  return (
    <Layout>
      <Header />
      <ChatList chats={chatList}/>
    </Layout>
  );
}

export default App;
