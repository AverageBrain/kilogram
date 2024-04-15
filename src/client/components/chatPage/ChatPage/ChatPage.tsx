import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import './ChatPage.css'
import InfiniteScroll from '../InfiniteScroll';
import { messagesStore } from '../../../stores';

const ChatPage: React.FC = () => {
  const { resetItems } = messagesStore;

  useEffect(() => () => {
    resetItems();
  });

  return (
    <div className="chat">
      <ChatHeader />
      <InfiniteScroll />
      <SendForm />
    </div>
  );
};

export default observer(ChatPage);
