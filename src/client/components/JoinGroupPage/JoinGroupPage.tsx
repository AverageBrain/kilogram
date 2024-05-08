import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, Flex, Layout, Spin, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { chatsStore } from '../../stores';
import { getCorrectMemberCase } from '../../utils';
import './JoinGroupPage.css'

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
      await joinGroup(joinKey);
    }
    navigate('/', { relative: 'path' });
  };

  useEffect(() => {
    if (joinKey) {
      getGroupByJoinKey(joinKey);
    }
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className="container join-group-card">
        <Flex  vertical gap={32} justify="center" align="center">
          {loading
            ? <Spin />
            : responseError === 'JoinKey not connected to any group'
              ? <Text className="h2">Такая группа не существует, проверьте вашу ссылку.</Text>
              : responseError === 'User already joined the group'
                ? <Text className="h2">Вы уже состоите в данной группе</Text>    
                : selectedItem && (
                  <>
                    <Avatar size={250} />
                    <Text className="h2">{selectedItem.name}</Text>
                    <Text className="h3">{selectedItem.users.length} {getCorrectMemberCase(selectedItem.users.length)}</Text>
                  </>
                )
          }
          <Button
            size="large"
            className="join-group-button"
            type="text"
            onClick={handleClick}
          >
              {selectedItem ? 'Присоединиться в группу' : 'Вернуться на главную'}
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default observer(JoinGroupPage);
