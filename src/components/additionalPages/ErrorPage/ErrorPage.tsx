import React from 'react';
import { Flex, Layout, Typography } from 'antd';
import clsx from 'clsx';

import commonStyles from '../additionalPages.module.scss';
import styles from './ErrorPage.module.css';

const { Content } = Layout;
const { Text } = Typography;

const ErrorPage: React.FC = () => (
  <Layout className={commonStyles.container} style={{ height: '100vh' }}>
    <Content className={commonStyles.content}>
      <Flex vertical gap={32} justify="center">
        <Text className={clsx(commonStyles.h2, styles.h2)}>Произошла ошибка</Text>
        <Text className={clsx(commonStyles.h4, styles.h4)}>Попробуйте перезагрузить страницу</Text>
      </Flex>
    </Content>
  </Layout>
);

export default ErrorPage;
