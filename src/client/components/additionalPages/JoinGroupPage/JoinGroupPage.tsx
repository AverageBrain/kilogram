import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Layout, Spin, Typography } from 'antd';
import { chatsStore } from '../../../stores';
import { getCorrectMemberCase } from '../../../utils';
import { Avatar } from '../../Avatar';

import '../additionalPages.css';

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
    <Layout className="container" style={{ height: "100vh" }}>
      <Content className="content">
        <Flex  vertical gap={32} justify="center" align="center">
          {loading
            ? <Spin />
            : responseError === 'JoinKey not connected to any group'
              ? <Text className="h3">Такая группа не существует, проверьте вашу ссылку.</Text>
              : responseError === 'User already joined the group'
                ? <Text className="h3">Вы уже состоите в данной группе</Text>    
                : selectedItem && (
                  <>
                    <Avatar size={250} />
                    <Text className="h3">{selectedItem.name}</Text>
                    <Text className="h4">{selectedItem.users.length} {getCorrectMemberCase(selectedItem.users.length)}</Text>
                  </>
                )
          }
          <Button
            size="large"
            className="action-button"
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
