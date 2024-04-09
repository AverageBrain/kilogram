import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown'

import { MessageType } from '../../../../types'
import './Message.css';

type Props = {
  message: MessageType;
  activeUserId: number;
}

const Message: React.FC<Props> = ({ message, activeUserId }) => {
  const isActivePerson = activeUserId === message.userId;

  return (
    <div className={clsx('message', isActivePerson ? 'my-message' : 'partner-message')}>
        <ReactMarkdown className="text">
          {message.text}
        </ReactMarkdown>
      <br />
      <span className={"timestep"}>
        {moment(message.createdAt).format('LT')}
      </span>
    </div>
  );
};

export default Message;
