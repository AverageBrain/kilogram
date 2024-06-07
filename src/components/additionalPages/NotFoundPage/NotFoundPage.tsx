import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Flex, Layout, Typography,
} from 'antd';
import clsx from 'clsx';

import commonStyles from '../additionalPages.module.scss';
import styles from './NotFoundPage.module.scss';

const { Content } = Layout;
const { Text } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <Layout className={commonStyles.container} style={{ height: '100dvh' }}>
      <Content className={commonStyles.content}>
        <Flex vertical gap={32} justify="center" align="center">
          <Text className={clsx(commonStyles.h1, styles.h1)}>404</Text>
          <Text className={clsx(commonStyles.h2, styles.h2)}>Страница не найдена</Text>
          <Text className={clsx(commonStyles.h4, styles.h4)}>
            Страница была перемещена, удалена, переименована
            <br />
            или возможно никогда не существовала
          </Text>
          <Button
            className={commonStyles['action-button']}
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
