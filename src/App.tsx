import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ChatsList } from './client/components';
import { ActiveChat } from './client/components/ActiveChat';
import { chats } from './mock/chats'
import { findUserById } from './mock/chats' 

function App() {
  return <ChatsList />;
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
