import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { authApiClient } from '../../hands';
import { authUserStore } from '../../stores';
import './LogInPage.css';
import { Navigate } from 'react-router-dom';

const { Content } = Layout;

const LogInPage: React.FC = () => {
  const { loggedIn } = authUserStore;

  const handleLogIn = () => authApiClient.authWithGithub();

  return (
    <>
      {loggedIn
        ? <Navigate replace to=".." relative="path" />
        :  (
          <Layout style={{ height: "100vh" }}>
            <Content className="container">
              <div className="card">
                <div className="circle">
                  KILOGRAM
                </div>
                <Button
                  size="large"
                  className="button"
                  type="text"
                  icon={<GithubOutlined style={{ fontSize: '30px'}} />}
                  onClick={handleLogIn}
                >
                    Войти через Github
                </Button>
              </div>
            </Content>
          </Layout>
        )
      }
    </>
  );

}

export default observer(LogInPage);
