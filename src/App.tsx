/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
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
    moment.locale('ru');
} ,[]);

  moment.locale('ru');

  return (
    loading
      ? <Spin />
      : isEmpty(selectedItem)
        ? <LogInPage />
        : <MainPage />
  );
}

export default observer(App);
