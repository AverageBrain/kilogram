import React from 'react';
import clsx from 'clsx';
import { Flex } from 'antd';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../types'
import './Message.css';
import { authUserStore } from '../../../stores';
import { Avatar } from '../../Avatar';

type Props = {
  message: MessageType;
  isGroup: boolean;
}

const Message: React.FC<Props> = ({ message, isGroup }) => {
  const { selectedItem } = authUserStore;

  const isActivePerson = selectedItem?.id === message.userId;
  return (

    <>
      <div className={clsx('message', isActivePerson ? 'my-message' : 'partner-message')}>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
        <div className="message-meta">
          <span className="timestep">
            {moment(message.createdAt).format('LT')}
          </span>
          {isGroup && !isActivePerson && <Avatar userId={message.userId} size={25} />}
        </div>
      </div>
      
    </>
  );
};

export default observer(Message);
