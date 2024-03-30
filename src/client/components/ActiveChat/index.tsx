import { FC } from 'react';
import { ChatType, UserType } from '../../../types'
import { Messages } from './components/Messages'
import { Header } from './components/Header'
import { SendMessage } from './components/SendMessage'
import './index.css'

interface Props {
  chat: ChatType;
  activeUser: UserType;
}

export const ActiveChat: FC<Props> = ({ chat, activeUser }) => {

  return (
    <div className="chat">
      <Header chat={chat}/>
      <Messages chat={chat} activeUser={activeUser}/>
      <SendMessage />
    </div>
  );
};
