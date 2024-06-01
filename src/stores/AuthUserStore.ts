import { action, computed, makeObservable, override, runInAction } from 'mobx';
import { message } from 'antd';
import { isEmpty } from 'lodash';

import { UserType } from '../types';
import BaseStore from './BaseStore';
import { authApiClient, userApiClient } from '../hands';
import { processSSEMessage } from '../utils';

class AuthUserStore extends BaseStore<UserType> {
  constructor() {
    super();
    makeObservable(this, {
      items: override,
      selectedItem: override,
      loading: override,

      loggedIn: computed,

      loadSelectedItem: action.bound,
      logIn: action.bound,
      logOut: action.bound,
    });
    this.loading = true;
  }

  get loggedIn(): boolean {
    return !isEmpty(this.selectedItem);
  }

  async loadSelectedItem(): Promise<void> {
    try {
      this.enableLoading();

      const data = await userApiClient.getMe();

      if (data) {
        userApiClient.setMessagesSource(processSSEMessage);
      }

      runInAction(() => {
        this.selectedItem = data;
      });
    } catch (e: any) {
      message.error('Не удалось получить пользователя');
      console.warn(e);
    } finally {
      this.disableLoading();
    }
  }

  async logIn(): Promise<void> {
    try {
      await authApiClient.authWithGithub();
    } catch (e: any) {
      message.error('Не удалось войти в аккаунт');
      console.warn(e);
    }
  }

  async logOut(): Promise<void> {
    try {
      await await authApiClient.logout();
    } catch (e: any) {
      message.error('Не удалось выйти из аккаунта');
      console.warn(e);
    }
  }
}

export default new AuthUserStore();
