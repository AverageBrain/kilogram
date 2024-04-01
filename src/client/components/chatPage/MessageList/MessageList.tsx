import React from 'react';

import { ChatType, UserType } from '../../../../types'
import { Message } from '../Message';

type Props =  {
  chat: ChatType;
  activeUser: UserType;
}

const MessageList: React.FC<Props> = ({ chat, activeUser }) => {

  return (
    <section className="messages">
      {chat.messages.map(curMessage => <Message message={curMessage} activeUser={activeUser}/>)}
    </section>
    
  );
};

export default MessageList;
