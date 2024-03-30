import { FC } from 'react';
import { ChatType, UserType } from '../../../../types'
import { Message } from './Message'

interface Props {
  chat: ChatType;
  activeUser: UserType;
}

export const Messages: FC<Props> = ({ chat, activeUser }) => {

  return (
    <section className="messages">
      {chat.messages.map(curMessage => <Message message={curMessage} activeUser={activeUser}/>)}
    </section>
    
  );
};
