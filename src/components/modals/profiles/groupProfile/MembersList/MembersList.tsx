import React from 'react';
import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { UserType } from '../../../../../types';
import { Avatar } from '../../../../Avatar';

import listsStyles from '../../../../../styles/lists.module.scss';

type Props = {
  users: UserType[];
  handleClickOnUser: (user: UserType) => void;
}

const MembersList: React.FC<Props> = ({ users, handleClickOnUser }) => {
  return (
    <List
      className={listsStyles['users-list']}
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          className={listsStyles['user']}
          key={user.id}
          onClick={() => handleClickOnUser(user)}
        >
          <List.Item.Meta
            className={listsStyles['user-meta']}
            avatar={<Avatar userId={user.id} />}
            title={<span className={listsStyles.title}>{user.name}</span>}
            description={
              <span className={listsStyles.description}>
                {user.lastSeen? user.lastSeen : 'был в сети недавно'}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default observer(MembersList);
