import React from 'react';
import { List } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore, userStore } from '../../../../stores';
import { UserType } from '../../../../types';
import { Avatar } from '../../../Avatar';
import styles from './ChatList.module.scss';

type Props = {
  results: UserType[];
  isSearching: string;
  setSearchTerm: (value: string) => void;
}

const SearchResults: React.FC<Props> = ({ setSearchTerm, isSearching, results }) => {
  const { selectedItem, setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { clearMessages } = messagesStore;

  const locale = {
    emptyText: isSearching === 'proccesing' ? 'Происходит поиск...' : 'Нет данных',
  };

  const handleClick = async (user: UserType) => {
    setSearchTerm('');
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
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
      renderItem={(user) => (
        <List.Item
          className={styles["chat-list-item"]}
          key={user.id}
          onClick={() => {handleClick(user)}}
        >
          <List.Item.Meta
            className={
              clsx(styles['chat-list-item-meta'], 
              user.id === selectedItem?.id && styles['chat-list-item-meta-active'])
            }
            avatar={<Avatar userId={user.id} />}
            title={<span className={styles.title}>{user.name}</span>}
            description={user.username}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(SearchResults);
