import React from 'react';
import clsx from 'clsx';
import { Typography } from 'antd';
import moment from 'moment';

import { UserType, MessageType } from '../../../../types'
import './Message.css';

type Props = {
  message: MessageType;
  activeUser: UserType;
}

const Message: React.FC<Props> = ({ message, activeUser }) => {
  const isActivePerson = activeUser === message.user;

  return (
    <div className={clsx('message', isActivePerson ? 'my-message' : 'partner-message')}>
      <Typography.Text className="text">
        {message.text}
      </Typography.Text>
      <br />
      <span className={"timestep"}>
        {moment(message.createdAt).format('LT')}
      </span>
    </div>
  );
};

export default Message;
