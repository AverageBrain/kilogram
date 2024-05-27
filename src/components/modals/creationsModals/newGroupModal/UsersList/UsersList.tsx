import React, { useEffect, useMemo, useState } from 'react';
import { FormikErrors } from 'formik';
import { List, Badge } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../../../stores';
import { useDebounce } from '../../../../../hooks';
import { Avatar } from '../../../../Avatar';
import { UserType } from '../../../../../types';
import { GroupFormType } from '../../../../../types';
import listsStyles from '../../../../../styles/lists.module.scss';
import { getHandle } from '../../../../../utils';

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
      className={listsStyles["users-list"]}
      locale={locale}
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(user) => (
        <List.Item
          className={listsStyles["user"]}
          key={user.id}
          onClick={() => handleClick(user, !user.selected)}
        >
          <List.Item.Meta
            className={listsStyles["user-meta"]}
            avatar={user.selected
              ? (
                <Badge
                  count={<CheckCircleFilled style={{ color: 'var(--base-accent-color)' }} />}
                  offset={[0, 35]}
                >
                  <Avatar userId={user.id} />
                </Badge>
              )
              : <Avatar userId={user.id} />}
            title={<span className={listsStyles.title}>{user.name}</span>}
            description={(
              <span className={listsStyles.description}>
                {getHandle({ user })}
              </span>
            )}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(UsersList);
