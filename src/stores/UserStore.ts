import { action, makeObservable, observable, runInAction } from 'mobx';

import { UserType } from '../types';
import BaseStore from './BaseStore';
import { userApiClient } from '../hands';

class UserStore extends BaseStore<UserType> {
    selectedUser?: UserType = undefined;   

    constructor() {
      super();
      makeObservable(this, {
        selectedUser: observable,

          loadItems: action.bound,
          setSelectedUser: action.bound,
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
}

export default new UserStore();
