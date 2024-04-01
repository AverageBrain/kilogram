import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { ChatListItemType } from '../../../../types';
import './ChatList.css'

type Props = {
  chats: ChatListItemType[];
};

const ChatList: React.FC<Props> = ({ chats }) => {
  const [activeChat, setActiveChat] = useState('0');

  const handleChatClick = (id: string) => {
    setActiveChat(id);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={chats}
      renderItem={(chat, index) => (
        <List.Item
          className='chat-list-item'
          key={chat.id}
          onClick={() => handleChatClick(chat.id)}
        >
          <List.Item.Meta
            className='chat-list-item-meta'
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={chat.name}
            description={chat.lastMessage}
            style={{ background: chat.id === activeChat ? '#00CCC940' : 'initial' }}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;
