import React from 'react';
import clsx from 'clsx';
import { Typography } from 'antd';

import { UserType, MessageType } from '../../../../types'
import './Message.css';

type Props = {
  message: MessageType;
  activeUser: UserType;
}

const Message: React.FC<Props> = ({ message, activeUser }) => {
  const isActivePerson = activeUser === message.user;

  return (
    <Typography.Text className={clsx('message', isActivePerson ? 'my-message' : 'partner-message')}>
      {message.text}
    </Typography.Text>
  );
};

export default Message;
