import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Card, Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';

import { Navigate } from 'react-router-dom';

import '../additionalPages.css';
import './LogInPage.css';

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
          <Layout className='container' style={{ height: "100vh" }}>
            <Content id="log-in-page" className="content">
              <Flex vertical gap={32} justify="center" align="center">
                <Text className="h1">KILOGRAM</Text>
                <Text className="h2">Добро пожаловать</Text>
                <Button
                  className="action-button"
                  size="large"
                  type="text"
                  icon={<GithubOutlined style={{ fontSize: '30px'}} />}
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

}

export default observer(LogInPage);
