import React, { useEffect, useMemo } from 'react';

import { List } from 'antd';
import { UserType } from '../../../../../types';
import { chatsStore, messagesStore, userStore } from '../../../../../stores';
import { Avatar } from '../../../../Avatar';
import { useDebounce } from '../../../../../hooks';
import listsStyles from '../../../../../styles/lists.module.scss';
import { observer } from 'mobx-react-lite';
import { getHandle } from '../../../../../utils';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  closeModal: () => void;
}

const NewMessageUsersList: React.FC<Props> = ({ searchTerm, setSearchTerm, closeModal }) => {
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
  
  const dataSource = useMemo(() => items, [items]);

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
      className={listsStyles['users-list']}
      locale={locale}
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(user) => (
        <List.Item
          className={listsStyles['user']}
          key={user.id}
          onClick={() => {handleClick(user)}}
        >
          <List.Item.Meta
            className={listsStyles['user-meta']}
            avatar={<Avatar userId={user.id} />}
            title={<span className={listsStyles.title}>{user.name}</span>}
            description={
              <span className={listsStyles.description}>
                {getHandle({ user })}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default observer(NewMessageUsersList);
