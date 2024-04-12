
import { action, makeObservable, override, runInAction } from 'mobx';
import { UserType } from '../../types';
import BaseStore from './BaseStore';
import { userApiClient } from '../hands';

class AuthUserStore extends BaseStore<UserType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadSelectedItem: action.bound,
        });
        this.loading = true
    }

    async loadSelectedItem(): Promise<void> {
        try {
          this.enableLoading();
        
          const data = await userApiClient.getMe();
    
          runInAction(() => {
            this.selectedItem = data;
          });
        } catch (e: any) {
          console.warn(e);
        } finally {
            this.disableLoading();
        }
      }
}

export default new AuthUserStore();
