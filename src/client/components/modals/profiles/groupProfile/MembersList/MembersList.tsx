import React from 'react';
import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { UserType } from '../../../../../../types';
import { Avatar } from '../../../../Avatar';

type Props = {
  users: UserType[];
  handleClickOnUser: (user: UserType) => void;
}

const MembersList: React.FC<Props> = ({ users, handleClickOnUser }) => {
  return (
    <List
      className="users-list"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          className="new-message-list-item"
          key={user.id}
          onClick={() => handleClickOnUser(user)}
        >
          <List.Item.Meta
            className="chat-list-item-meta"
            avatar={<Avatar userId={user.id} />}
            title={user.name}
            description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(MembersList);
