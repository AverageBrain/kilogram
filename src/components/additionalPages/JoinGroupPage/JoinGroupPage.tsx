import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Layout, Spin, Typography } from 'antd';
import { chatsStore } from '../../../stores';
import { getCorrectMemberCase } from '../../../utils';
import { Avatar } from '../../Avatar';
import clsx from 'clsx';

import commonStyles from '../additionalPages.module.scss';
import styles from './JoinGroupPage.module.scss';

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
    <Layout className={commonStyles.container} style={{ height: '100vh' }}>
      <Content className={commonStyles.content}>
        <Flex  vertical gap={32} justify="center" align="center">
          {loading
            ? <Spin />
            : responseError === 'JoinKey not connected to any group'
              ? <Text className={clsx(commonStyles.h3, styles.h3)}>
                  Такая группа не существует, проверьте вашу ссылку.
                </Text>
              : responseError === 'User already joined the group'
                ? <Text className={clsx(commonStyles.h3, styles.h3)}>Вы уже состоите в данной группе</Text>
                : selectedItem && (
                  <>
                    <Avatar size={250} />
                    <Text className={clsx(commonStyles.h3, styles.h3)}>{selectedItem.name}</Text>
                    <Text className={clsx(commonStyles.h4, styles.h4)}>
                      {selectedItem.users.length} {getCorrectMemberCase(selectedItem.users.length)}
                    </Text>
                  </>
                )
          }
          <Button
            className={commonStyles['action-button']}
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
