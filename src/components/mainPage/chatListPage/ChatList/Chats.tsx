import React from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'antd';
import clsx from 'clsx';
import { chatsStore } from '../../../../stores';
import { ChatType } from '../../../../types';
import { Avatar } from '../../../Avatar';
import { TypeOfChat } from '../../../../types';

import listsStyles from '../../../../styles/lists.module.scss';

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
      className={listsStyles.chats}
      locale={locale}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(chat) => (
        <List.Item
          key={chat.id}
          className={listsStyles["chat-list-item"]}
          onClick={() => handleClick(chat)}
        >
          <List.Item.Meta
            className={clsx(listsStyles['chat-list-item-meta'], chat.id === selectedItem?.id && listsStyles['chat-list-item-meta-active'])}
            avatar={chat.type == TypeOfChat.Chat
              ? <Avatar userId={chat.users[0].id} userStatus={chat.users[0]?.userStatus} />
              : <Avatar />}
            title={
              <span className={listsStyles.title}>
                {chat.type == TypeOfChat.Chat ? chat.users[0].name : chat.name}
              </span>
            }
            description={
              chat.messages.length > 0
                ? <div dangerouslySetInnerHTML={{ __html:  `<div class=${clsx(listsStyles["last-message"], listsStyles['description'])}>${chat.messages[0].text}</div>` }} />
                : <span className={listsStyles.description}>У вас нет сообщений</span>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default observer(Chats);
