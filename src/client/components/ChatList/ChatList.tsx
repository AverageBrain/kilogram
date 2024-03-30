import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { ChatListItem } from '../../../types';

type Props = {
  chats: ChatListItem[];
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
          key={chat.id}
          onClick={() => handleChatClick(chat.id)}
        >
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={chat.name}
            description={chat.lastMessage}
            style={{ background: chat.id === activeChat ? '#f0f0f0' : 'initial' }}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;