import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Card, Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { authApiClient } from '../../hands';
import { authUserStore } from '../../stores';
import './LogInPage.css';
import { Navigate } from 'react-router-dom';

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
            <Content className="not-found-card">
              <Flex vertical gap={32} justify="center" align="center">
              <Text className="h1" style={{fontSize: '15vw'}}>KILOGRAM</Text>
              <Text className="h2" style={{fontSize: '5vw'}}>Добро пожаловать</Text>
                <Button
                  className="not-found-button"
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
