import React from 'react';

import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import { MessageList } from '../MessageList';
import { ChatType } from '../../../../types';
import './ChatPage.css'

type Props = {
  chat: ChatType;
  activeUserId: number;
}

const ChatPage: React.FC<Props> = ({ chat, activeUserId }) => {

  return (
    <div className="chat">
      <ChatHeader chat={chat}/>
      <MessageList chat={chat} activeUserId={activeUserId}/>
      <SendForm />
    </div>
  );
};

export default ChatPage;
