import React from 'react';
import { List, Avatar } from 'antd';
import { ChatListItemType } from '../../../../types';
import { chatList } from '../../../../mock';
import './ChatList.css'

type Props = {
  activeChat: ChatListItemType | null;
  setActiveChat: (chat: ChatListItemType | null) => void;
};

const ChatList: React.FC<Props> = ({ activeChat, setActiveChat }) => {
  return (
    <List
      className="list"
      itemLayout="horizontal"
      dataSource={chatList}
      renderItem={(chat, index) => (
        <List.Item
          className='chat-list-item'
          key={chat.id}
          onClick={() => setActiveChat(chat)}
        >
          <List.Item.Meta
            className='chat-list-item-meta'
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={chat.name}
            description={chat.lastMessage}
            style={{ background: chat.id === activeChat?.id ? '#00CCC940' : 'initial' }}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;
