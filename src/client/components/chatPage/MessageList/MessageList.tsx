import React from 'react';

import { ChatType } from '../../../../types'
import { Message } from '../Message';

type Props =  {
  chat: ChatType;
  activeUserId: number;
}

const MessageList: React.FC<Props> = ({ chat, activeUserId }) => {

  return (
    <section className="messages">
      {chat.messages.map(curMessage => <Message message={curMessage} activeUserId={activeUserId}/>)}
    </section>
    
  );
};

export default MessageList;
