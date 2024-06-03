import React from 'react';
import { Flex, Layout, Typography } from 'antd';

import styles from '../additionalPages.module.scss';

const { Content } = Layout;
const { Text } = Typography;

const ErrorPage: React.FC = () => (
    <Layout className={styles.container} style={{ height: '100vh' }}>
      <Content className={styles.content}>
        <Flex vertical gap={32} justify="center">
          <Text className={styles.h2}>Произошла ошибка</Text>
          <Text className={styles.h4}>Попробуйте перезагрузить страницу</Text>
        </Flex>
      </Content>
    </Layout>
);

export default ErrorPage;
