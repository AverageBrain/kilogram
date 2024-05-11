import React from 'react';
import { observer } from 'mobx-react-lite';
import { List, Avatar as AvatarAD } from 'antd';
import clsx from 'clsx';


import { chatsStore, messagesStore } from '../../../stores';
import { ChatType } from '../../../../types';
import { Avatar } from '../../Avatar';
import { TypeOfChat } from '../../../../types/types';
import './ChatList.css'

type Props = {
  setSearchTerm: (value: string) => void;
}

const Chats: React.FC<Props> = ({ setSearchTerm }) => {
  const { selectedItem, items, setSelectedChat } = chatsStore;

  const locale = {
    emptyText: 'У вас нет чатов.',
  };

  const handleClick = async (chat: ChatType) => {
    setSearchTerm('');
    if (chat.id !== selectedItem?.id) {
      setSelectedChat(chat);
    }
  };

  return (
    <List
      className="chats"
      locale={locale}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(chat) => (
        <List.Item
          key={chat.id}
          className="chat-list-item"
          onClick={() => handleClick(chat)}
        >
          <List.Item.Meta
            className={clsx('chat-list-item-meta', chat.id === selectedItem?.id && 'chat-list-item-meta-active')}
            avatar={chat.type == TypeOfChat.Chat ? <Avatar userId={chat.users[0].id} /> : <AvatarAD />}
            title={chat.type == TypeOfChat.Chat ? chat.users[0].name : chat.name}
            description={chat.messages.length > 0
              ? <div dangerouslySetInnerHTML={{ __html:  `<div class="last-message">${chat.messages[0].text}</div>` }} />
              : 'У вас нет сообщений'}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(Chats);
