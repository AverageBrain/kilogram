import { action, makeObservable, observable, runInAction } from 'mobx';

import { UserType } from '../types';
import { userApiClient } from '../hands';
import { cacheMaxSize } from '../constants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore<UserType> {
  selectedUser: UserType | undefined = undefined;
  avatarCache: Map<number, string> = new Map();
  avatarLoading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      selectedUser: observable,
      avatarCache: observable,
      avatarLoading: observable,

      loadItems: action.bound,
      setSelectedUser: action.bound,
      loadAvatar: action.bound,
    });
  }

  async loadItems(prefix?: string): Promise<void> {
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
    } catch (e: any) {
      console.warn(e);
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
      runInAction(() => {
        this.avatarLoading = true;
      });

      const data = await userApiClient.getAvatar(id);
      console.log('data', data);

      runInAction(() => {
        if (this.avatarCache.size >= cacheMaxSize) {
          const oldestKey = this.avatarCache.keys().next().value;
          this.avatarCache.delete(oldestKey);
        }
        this.avatarCache.set(id, data);

        return data;
      });
    } catch (e: any) {
      console.warn(e);
    } finally {
      runInAction(() => {
        this.avatarLoading = false;
      });
    }
  }
}

export default new UserStore();
