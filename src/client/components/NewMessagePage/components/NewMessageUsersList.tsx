import React, { useEffect, useState } from 'react';

import { List } from 'antd';
import { UserType } from '../../../../types';
import { userApiClient } from '../../../hands';
import { chatsStore, messagesStore, userStore } from '../../../stores';
import { Avatar } from '../../Avatar';
import { useDebounce } from '../../../../hooks';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  closeModal: () => void;
}

export const NewMessageUsersList: React.FC<Props> = ({ searchTerm, setSearchTerm, closeModal }) => {
  const { items, setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { loadItems, clearMessages } = messagesStore;
  const [ isSearching, setIsSearcing ] = useState('');
  const [ results, setResults ] = useState(new Array<UserType>());

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const locale = {
    emptyText: isSearching ? (isSearching === 'proccesing' ? 'Поиск...' : 'Нет данных') : "У вас нет активных пользователей",
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearcing('proccesing');
        // TODO: переписать на стор
        userApiClient.findUsers(debouncedSearchTerm).then(results => {
          setIsSearcing('found');

          setResults(results);
        });
      } else {
        setIsSearcing('');
        setResults([]);
      }
    }, [debouncedSearchTerm]
  )

  const handleClick = async (user: UserType) => {
    setSearchTerm('');
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
      closeModal();
      await loadItems(chat.id);
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
      dataSource={isSearching ? results : items.filter(chat => chat.type === 'chat').map(chat => chat.users[0])}
      renderItem={(user) => (
        <List.Item
          className="new-message-list-item"
          key={user.id}
          onClick={() => {handleClick(user)}}
        >
          <List.Item.Meta
            className={'chat-list-item-meta'}
            avatar={<Avatar user={user} />}
            title={user.name}
            description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          />
        </List.Item>
      )}
    />
  );
};
