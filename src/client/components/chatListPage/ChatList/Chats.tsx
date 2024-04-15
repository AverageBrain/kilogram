import React from 'react';
import { List } from 'antd';
import clsx from 'clsx';
import { chatsStore, messagesStore } from '../../../stores';
import './ChatList.css'
import { ChatType } from '../../../../types';
import { observer } from 'mobx-react-lite';
import { Avatar } from '../../Avatar';

type Props = {
  setSearchTerm: (value: string) => void;
}

const Chats: React.FC<Props> = ({ setSearchTerm }) => {
  const { selectedItem, items, setSelectedChat } = chatsStore;
  const { loadItems } = messagesStore;

  const locale = {
    emptyText: 'У вас нет чатов.',
  };

  const handleClick = async (chat: ChatType) => {
    setSearchTerm('');
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
            avatar={<Avatar user={chat.users[0]} />}
            title={chat.users[0].name}
            description={chat.messages.length > 0 ? chat.messages[0].text : 'У вас нет сообщений'}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(Chats);
