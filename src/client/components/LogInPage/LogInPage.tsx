import React from 'react';
import { Button, Layout, Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { authApiClient } from '../../hands';
import './LogInPage.css';

const { Content } = Layout;

const LogInPage: React.FC = () => {
  const handleLogIn = () => authApiClient.authWithGithub();

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className="container">
        <Card className="card">
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
              Войти через Гитхаб
          </Button>
        </Card>
      </Content>
    </Layout>
  );
}

export default LogInPage;
