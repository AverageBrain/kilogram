import React from 'react';
import { List } from 'antd';
import { observer } from 'mobx-react-lite';

import { UserType } from '../../../../../types';
import { Avatar } from '../../../../Avatar';
import { getHandle } from '../../../../../utils';
import listsStyles from '../../../../../styles/lists.module.scss';

type Props = {
  users: UserType[];
  handleClickOnUser: (user: UserType) => void;
};

const MembersList: React.FC<Props> = ({ users, handleClickOnUser }) => (
    <List
      className={listsStyles['users-list']}
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          className={listsStyles.user}
          key={user.id}
          onClick={() => handleClickOnUser(user)}
        >
          <List.Item.Meta
            className={listsStyles['user-meta']}
            avatar={<Avatar userId={user.id} userStatus={user?.userStatus} />}
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

export default observer(MembersList);
