import React from 'react';
import { List } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore, userStore } from '../../../../stores';
import { UserType } from '../../../../types';
import { Avatar } from '../../../Avatar';
import listsStyles from '../../../../styles/lists.module.scss';

type Props = {
  setSearchTerm: (value: string) => void;
};

const SearchResults: React.FC<Props> = ({ setSearchTerm }) => {
  const { selectedItem, setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { resetItems } = messagesStore;


  const locale = {
    emptyText: loading ? 'Происходит поиск...' : 'Нет данных',
  };

  const handleClick = async (user: UserType) => {
    setSearchTerm('');
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
    } else {
      setSelectedUser(user);
      setSelectedChat(undefined);
      resetItems();
    }
  };

  return (
    <List
      className={listsStyles.chats}
      locale={locale}
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          className={listsStyles['chat-list-item']}
          key={user.id}
          onClick={() => handleClick(user)}
        >
          <List.Item.Meta
            className={
              clsx(listsStyles['chat-list-item-meta'],
                user.id === selectedItem?.id && listsStyles['chat-list-item-meta-active'])
            }
            avatar={<Avatar userId={user.id} userStatus={user?.userStatus} />}
            title={<span className={listsStyles.title}>{user.name}</span>}
            description={<span className={listsStyles.description}>{user.username}</span>}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(SearchResults);
