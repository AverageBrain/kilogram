import React, { useEffect, useMemo, useState } from 'react';
import { FormikErrors } from 'formik';
import { List, Badge } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import { userStore } from '../../../stores';
import { useDebounce } from '../../../../hooks';
import { Avatar } from '../../Avatar';
import { UserType } from '../../../../types';
import { GroupFormType } from '../../../types';
import './UsersList.css';

type Props = {
  userIds: number[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GroupFormType>>;
  searchTerm: string;
}

const UsersList: React.FC<Props> = ({
  searchTerm,
  userIds,
  setFieldValue,
}) => {
  const { loading, items, loadItems } = userStore;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    loadItems(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const locale = {
    emptyText: loading ? 'Поиск...' : 'Нет данных',
  };

  const dataSource = useMemo(() => items.map((user) => ({
    ...user,
    selected: userIds.includes(user.id),
  })), [items, userIds]);

  const handleClick = async (user: UserType, select: boolean) => {
    if (select) {
      setFieldValue('userIds', [...userIds, user.id]);
    } else {
      setFieldValue('userIds', userIds.filter((id) => id !== user.id));
    }
  };

  return (
    <List
      className="users-list"
      locale={locale}
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(user) => (
        <List.Item
          className="new-message-list-item"
          key={user.id}
          onClick={() => handleClick(user, !user.selected)}
        >
          <List.Item.Meta
            className="chat-list-item-meta"
            avatar={user.selected
              ? (
                <Badge
                  count={<CheckCircleFilled style={{ color: '#FF686B' }} />}
                  offset={[0, 35]}
                >
                  <Avatar userId={user.id} />
                </Badge>
              )
              : <Avatar userId={user.id} />}
            title={user.name}
            description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(UsersList);
