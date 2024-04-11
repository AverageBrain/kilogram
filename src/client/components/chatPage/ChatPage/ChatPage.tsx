import React from 'react';

import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import { MessageList } from '../MessageList';
import './ChatPage.css'

const ChatPage: React.FC = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <MessageList />
      <SendForm />
    </div>
  );
};

export default ChatPage;
