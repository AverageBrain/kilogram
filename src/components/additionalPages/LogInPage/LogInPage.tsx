import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';

import { Navigate } from 'react-router-dom';
import clsx from 'clsx';

import commonStyles from '../additionalPages.module.scss';
import styles from './LogInPage.module.scss';

const { Content } = Layout;
const { Text } = Typography;

const LogInPage: React.FC = () => {
  const { loggedIn } = authUserStore;

  const handleLogIn = () => authApiClient.authWithGithub();

  return (
    <>
      {loggedIn
        ? <Navigate replace to="/" relative="path" />
        :  (
          <Layout className={commonStyles.container} style={{ height: '100vh' }}>
            <Content className={clsx(styles['log-in-page'], commonStyles.content)}>
              <Flex vertical gap={32} justify="center" align="center">
                <Text className={styles.h1}>KILOGRAM</Text>
                <Text className={styles.h2}>Добро пожаловать</Text>
                <Button
                  className={commonStyles['action-button']}
                  size="large"
                  type="text"
                  icon={<GithubOutlined style={{ fontSize: '30px' }} />}
                  onClick={handleLogIn}
                >
                  Войти через GitHub
                </Button>
              </Flex>
            </Content>
          </Layout>
        )
      }
    </>
  );

};

export default observer(LogInPage);
