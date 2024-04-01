import React from 'react';
import clsx from 'clsx';
import './index.css';

import { UserType, MessageType } from '../../../../types'

type Props = {
  message: MessageType;
  activeUser: UserType;
}

const Message: React.FC<Props> = ({ message, activeUser }) => {
  const isActivePerson = activeUser === message.user;

  return (
    <div className={clsx('message', isActivePerson ? 'my-message' : 'partner-message')}>
      {message.text}
    </div>
  );
};

export default Message;
