import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../types'
import './Message.css';
import { authUserStore } from '../../../stores';

type Props = {
  message: MessageType;
}

const Message: React.FC<Props> = ({ message }) => {
  const { selectedItem } = authUserStore;

  const isActivePerson = selectedItem?.id === message.userId;

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

export default observer(Message);
