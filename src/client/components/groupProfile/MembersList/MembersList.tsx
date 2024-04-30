import React from 'react';
import { FormikErrors } from 'formik';
import { List, Badge } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { UserType } from '../../../../types';
import { Avatar } from '../../Avatar';

type Props = {
  users: UserType[];
}

const MembersList: React.FC<Props> = ({ users }) => {
  return (
    <List
      className="users-list"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          className="new-message-list-item"
          key={user.id}
        >
          <List.Item.Meta
            className="chat-list-item-meta"
            avatar={<Avatar user={user} />}
            title={user.name}
            description={user.lastSeen? user.lastSeen : 'был в сети недавно'}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(MembersList);
