import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ActiveChat } from './client/components/ActiveChat';
import { chats } from './mock/chats'
import { findUserById } from './mock/chats' 

function App() {
  return (
    <ActiveChat chat={chats[0]} activeUser={findUserById('1')}/>
  );
}

export default App;
