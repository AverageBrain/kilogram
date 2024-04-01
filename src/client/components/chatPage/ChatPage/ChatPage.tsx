import React from 'react';

import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import { MessageList } from '../MessageList';
import { ChatType, UserType } from '../../../../types';
import './ChatPage.css'

type Props = {
  chat: ChatType;
  activeUser: UserType;
}

const ChatPage: React.FC<Props> = ({ chat, activeUser }) => {

  return (
    <div className="chat">
      <ChatHeader chat={chat}/>
      <MessageList chat={chat} activeUser={activeUser}/>
      <SendForm />
    </div>
  );
};

export default ChatPage;
