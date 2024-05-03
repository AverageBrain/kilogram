import React from 'react';
import { List } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore, userStore } from '../../../stores';
import './ChatList.css'
import { UserType } from '../../../../types';
import { Avatar } from '../../Avatar';

type Props = {
  results: UserType[];
  isSearching: string;
  setSearchTerm: (value: string) => void;
}

const SearchResults: React.FC<Props> = ({ setSearchTerm, isSearching, results }) => {
  const { selectedItem, setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { loadItems, clearMessages } = messagesStore;

  const locale = {
    emptyText: isSearching === 'proccesing' ? 'Происходит поиск...' : 'Нет данных',
  };

  const handleClick = async (user: UserType) => {
    setSearchTerm('');
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
      await loadItems(chat.id);
    } else {
      setSelectedUser(user);
      setSelectedChat(undefined);
      clearMessages();
    }
  };

  
  return (
    <List
      locale={locale}
      itemLayout="horizontal"
      dataSource={results}
      renderItem={(user, index) => (
        <List.Item
          className="chat-list-item"
          key={user.id}
          onClick={() => {handleClick(user)}}
        >
          <List.Item.Meta
            className={clsx('chat-list-item-meta', user.id === selectedItem?.id && 'chat-list-item-meta-active')}
            avatar={<Avatar userId={user.id} />}
            title={user.name}
            description={user.username}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(SearchResults);
