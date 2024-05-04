import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Layout, Typography } from 'antd';

import './NotFoundPage.css';

const { Content } = Layout;
const { Text } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className="not-found-card">
        <Flex vertical gap={32} justify="center">
        <Text className="h1">404</Text>
        <Text className="h2">Страница не найдена</Text>
        <Text className="h3">Страница была перемещена, удалена, переименована
          <br />или возможно никогда не существовала</Text>
          <Button
            className="not-found-button"
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
