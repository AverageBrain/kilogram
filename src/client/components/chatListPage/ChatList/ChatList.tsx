import React from 'react';
import { List, Avatar } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore } from '../../../stores';
import './ChatList.css'
import { ChatType } from '../../../../types';

type Props = {
  data: ChatType[];
  setSearchTerm: (value: string) => void;
}

const ChatList: React.FC<Props> = ({ data, setSearchTerm }) => {
  const { selectedItem, setSelectedChat } = chatsStore;
  const { loadItems } = messagesStore;
  console.log(data);

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
      dataSource={data}
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
            description={chat.messages.length > 0 ? chat.messages[0].text : '@' + chat.user.username}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(ChatList);
