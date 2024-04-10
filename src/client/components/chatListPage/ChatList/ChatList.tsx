import React from 'react';
import { List, Avatar } from 'antd';
import clsx from 'clsx';

import { ChatType } from '../../../../types';
import { chatsStore } from '../../../stores';
import './ChatList.css'

type Props = {
  activeChat: ChatType | null;
  setActiveChat: (chat: ChatType | null) => void;
};

const ChatList: React.FC<Props> = ({ activeChat, setActiveChat }) => {
  const { items } = chatsStore;

  const locale = {
    emptyText: 'У вас нет чатов.',
  };

  return (
    <List
      locale={locale}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(chat, index) => (
        <List.Item
          className="chat-list-item"
          key={chat.id}
          onClick={() => setActiveChat(chat)}
        >
          <List.Item.Meta
            className={clsx('chat-list-item-meta', chat.id === activeChat?.id && 'chat-list-item-meta-active')}
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={chat.user.name}
            description={'aaa'}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;
