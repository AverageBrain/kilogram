import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button, Layout, Flex, Typography,
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import clsx from 'clsx';
import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';

import commonStyles from '../additionalPages.module.scss';
import styles from './LogInPage.module.scss';

const { Content } = Layout;
const { Text } = Typography;

const LogInPage: React.FC = () => {
  const { loggedIn, logIn } = authUserStore;

  return (
    <>
      {loggedIn
        ? <Navigate replace to="/" relative="path" />
        : (
          <Layout className={commonStyles.container} style={{ height: '100vh' }}>
            <Content className={clsx(styles['log-in-page'], commonStyles.content)}>
              <Flex vertical gap={32} justify="center" align="center">
                <Text className={clsx(commonStyles.h1, styles.h1)}>KILOGRAM</Text>
                <Text className={clsx(commonStyles.h2, styles.h2)}>Добро пожаловать</Text>
                <Button
                  className={commonStyles['action-button']}
                  type="text"
                  icon={<GithubOutlined style={{ fontSize: '30px' }} />}
                  onClick={logIn}
                >
                  Войти через GitHub
                </Button>
              </Flex>
            </Content>
          </Layout>
        )}
    </>
  );
};

export default observer(LogInPage);
