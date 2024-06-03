/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/ru';

import AppRouter from './components';
import { authUserStore, reactionsStore } from './stores';
import { requestPermission } from './plugins/firebase';

const App: React.FC = () => {
  const {
    loading,
    loadSelectedItem,
    selectedItem,
  } = authUserStore;

  const { loadReactions } = reactionsStore;

  useEffect(() => {
    moment.locale('ru');
    requestPermission();
    loadSelectedItem();
  }, []);

  useEffect(() => {
    if (selectedItem?.id) {
      loadReactions();
    }
  }, [selectedItem]);

  return (
    loading
      ? <Spin />
      : <AppRouter />
  );
};

export default observer(App);
