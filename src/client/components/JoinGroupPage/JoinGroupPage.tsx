import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, Flex, Layout, Spin, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { chatsStore } from '../../stores';
import { getCorrectMemberCase } from '../../utils';

const { Content } = Layout;
const { Text } = Typography;

const JoinGroupPage: React.FC = () => {
  const {
    selectedItem,
    loading,
    responseError,
    getGroupByJoinKey,
    joinGroup,
  } = chatsStore;

  const { joinKey } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (selectedItem && joinKey) {
    // if (joinKey) {
      await joinGroup(joinKey);
    }
    navigate('../..', { relative: 'path' });
  };

  useEffect(() => {
    if (joinKey) {
      getGroupByJoinKey(joinKey);
    }
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className="container">
        <div className="card">
          {loading
            ? <Spin />
            : responseError === 'JoinKey not connected to any group'
              ? <Text>Такая группа не существует, проверьте вашу ссылку.</Text>
              : responseError === 'User already joined the group'
                ? <Text>Вы уже состоите в данной группе</Text>
                : selectedItem && (
                  <Flex gap={16}>
                    <Avatar size={80} />
                    <Flex vertical gap={8}>
                      <Text strong>{selectedItem.name}</Text>
                      <Text>{selectedItem.users.length} {getCorrectMemberCase(selectedItem.users.length)}</Text>
                    </Flex>
                  </Flex>
                )
          }
          <Button
            size="large"
            className="button"
            type="text"
            onClick={handleClick}
          >
              {selectedItem ? 'Присоединиться в группу' : 'Вернуться на главную'}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default observer(JoinGroupPage);
