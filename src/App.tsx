/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';

import { LogInPage, MainPage } from './client/components';
import { authUserStore } from './client/stores';

const App: React.FC = () => {
  const {
    selectedItem,
    loading,
    loadSelectedItem,
  } = authUserStore;

  useEffect(() => {
    loadSelectedItem();
  } ,[]);

  return (
    loading
      ? <Spin />
      : isEmpty(selectedItem)
        ? <LogInPage />
        : <MainPage />
  );
}

export default observer(App);
