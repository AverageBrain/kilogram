import React from 'react';
import { Layout } from 'antd';
import { ChatType } from '../../../../types'

type Props = {
  chat: ChatType;
}

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC<Props> = ({ chat }) => {

  return (
    <HeaderAD>
      <div className="user-name">{chat.user.name}</div>
    </HeaderAD>
  );
};

export default ChatHeader;
