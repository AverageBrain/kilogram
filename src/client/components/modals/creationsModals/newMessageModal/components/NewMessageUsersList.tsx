import React, { useEffect, useMemo, useState } from 'react';

import { List } from 'antd';
import { UserType } from '../../../../../../types';
import { chatsStore, messagesStore, userStore } from '../../../../../stores';
import { Avatar } from '../../../../Avatar';
import { useDebounce } from '../../../../../../hooks';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  closeModal: () => void;
}

export const NewMessageUsersList: React.FC<Props> = ({ searchTerm, setSearchTerm, closeModal }) => {
  const { setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { clearMessages } = messagesStore;
  const { loadItems: loadUsers, loading, items } = userStore;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
      loadUsers(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const locale = {
    emptyText: loading ? 'Поиск...' : 'Нет данных',
  };
  
  const dataSource = useMemo(() => items.map((user) => ({
    ...user
  })), [items]);


  const handleClick = async (user: UserType) => {
    setSearchTerm('');
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
      closeModal();
    } else {
      setSelectedUser(user);
      setSelectedChat(undefined);
      closeModal();
      clearMessages();
    }
  };

  return (
    <List
      locale={locale}
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(user) => (
        <List.Item
          className="new-message-list-item"
          key={user.id}
          onClick={() => {handleClick(user)}}
        >
          <List.Item.Meta
            className={'chat-list-item-meta'}
            avatar={<Avatar userId={user.id} />}
            title={user.name}
            description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          />
        </List.Item>
      )}
    />
  );
};
