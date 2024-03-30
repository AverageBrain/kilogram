import React from 'react';
import { List, Avatar } from 'antd';
import { ChatListItem } from '../../../types';

type Props = {
  chats: ChatListItem[];
};

const ChatList: React.FC<Props> = ({ chats }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chats}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.name}</a>}
            description={item.lastMessage}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;