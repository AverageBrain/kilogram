import React from 'react';
import { List, Avatar } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore } from '../../../stores';
import './ChatList.css'
import { ChatType } from '../../../../types';

const ChatList: React.FC = () => {
  const { selectedItem, items, setSelectedChat } = chatsStore;
  const { loadItems } = messagesStore;

  const locale = {
    emptyText: 'У вас нет чатов.',
  };
  const handleClick = async (chat: ChatType) => {
    setSelectedChat(chat);
    await loadItems(chat.id);
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
          onClick={() => {handleClick(chat)}}
        >
          <List.Item.Meta
            className={clsx('chat-list-item-meta', chat.id === selectedItem?.id && 'chat-list-item-meta-active')}
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={chat.user.name}
            description={chat.messages[0].text}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(ChatList);
