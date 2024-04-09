/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';

import { MainPage } from './client/components';
import { authUserStore } from './client/stores';
import Auth from './Auth';

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
      ? <Auth />
      : <MainPage />
  );
}

export default observer(App);
