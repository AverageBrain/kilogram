/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/ru';

import AppRouter from './components';
import {authUserStore, reactionsStore} from './stores';

const App: React.FC = () => {
  const {
    loading,
    loadSelectedItem,
    loggedIn
  } = authUserStore;

  const {loadReactions} = reactionsStore

  useEffect(() => {
    loadSelectedItem()
    loadReactions();
    moment.locale('ru');
  } ,[]);

  return (
    loading
      ? <Spin />
      : <AppRouter />
  );
}

export default observer(App);
