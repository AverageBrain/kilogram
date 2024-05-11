import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Layout, Typography } from 'antd';

import '../additionalPages.css';

const { Content } = Layout;
const { Text } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <Layout className="container" style={{ height: "100vh" }}>
      <Content className="content">
        <Flex vertical gap={32} justify="center">
        <Text className="h1">404</Text>
        <Text className="h2">Страница не найдена</Text>
        <Text className="h4">Страница была перемещена, удалена, переименована
          <br />или возможно никогда не существовала</Text>
          <Button
            className="action-button"
            size="large"
            type="text"
            onClick={handleClick}
          >
              Вернуться на главную
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
