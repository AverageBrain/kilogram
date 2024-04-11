import React from 'react';
import { Button, Layout } from 'antd';
import { authApiClient } from '../../hands';

const { Content } = Layout;

const LogInPage: React.FC = () => {
  const handleLogIn = () => authApiClient.authWithGithub();


  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Button onClick={handleLogIn}>
            Authorize with GitHub
        </Button>
      </Content>
    </Layout>
  );
}

export default LogInPage;
