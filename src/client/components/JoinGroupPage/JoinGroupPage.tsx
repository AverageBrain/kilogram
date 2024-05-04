import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, Flex, Layout, Spin, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { chatsStore } from '../../stores';
import { useParams } from 'react-router-dom';
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
            : (selectedItem &&
              <Flex gap={16}>
                <Avatar size={80} />
                <Flex vertical gap={8}>
                  <Text strong>{selectedItem.name}</Text>
                  <Text>{selectedItem.users.length} {getCorrectMemberCase(selectedItem.users.length)}</Text>
                </Flex>
              </Flex>
          )}
          <Button
            size="large"
            className="button"
            type="text"
          >
              Присоединиться в группу
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default observer(JoinGroupPage);
