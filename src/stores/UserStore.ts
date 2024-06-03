import { action, makeObservable, observable, runInAction } from 'mobx';
import { message } from 'antd';

import { UserType } from '../types';
import { userApiClient } from '../hands';
import { cacheMaxSize } from '../constants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore<UserType> {
  selectedUser: UserType | undefined = undefined;

  avatarCache: Map<number, string> = new Map();

  constructor() {
    super();
    makeObservable(this, {
      selectedUser: observable,

      loadItems: action.bound,
      setSelectedUser: action.bound,
      loadAvatar: action.bound,
    });
  }

  async loadItems(prefix?: string): Promise<UserType[]> {
    try {
      this.enableLoading();

      let data: UserType[] = [];
      if (prefix) {
        data = await userApiClient.findUsers(prefix);
      } else {
        data = await userApiClient.getUsers();
      }

      runInAction(() => {
        this.items = data;
      });

      return data;
    } catch (e: any) {
      message.error('Не удалось получить пользователей');
      console.warn(e);

      return [];
    } finally {
      this.disableLoading();
    }
  }

  setSelectedUser(user?: UserType): void {
    runInAction(() => {
      this.selectedUser = user;
    });
  }

  async loadAvatar(id: number): Promise<string | void> {
    try {
      const data = await userApiClient.getAvatar(id);

      runInAction(() => {
        if (this.avatarCache.size >= cacheMaxSize) {
          const oldestKey = this.avatarCache.keys().next().value;
          this.avatarCache.delete(oldestKey);
        }
        this.avatarCache.set(id, data);
      });

      return data;
    } catch (e: any) {
      message.error('Не удалось загрузить аватар');
      console.warn(e);
    }
  }
}

export default new UserStore();
