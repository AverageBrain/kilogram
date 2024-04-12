import React from 'react';
import { observer } from 'mobx-react-lite';

import { Message } from '../Message';
import { messagesStore } from '../../../stores';
import './MessageList.css';

const MessageList: React.FC = () => {
  const { items } = messagesStore; 

  return (
    <section className="messages">
      {items.map((curMessage, key) => <Message key={key} message={curMessage} />)}
    </section>
  );
};

export default observer(MessageList);
