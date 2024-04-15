import { action, makeObservable, observable, runInAction } from 'mobx';
import { UserType } from '../../types';

class UserStore {
    selectedUser?: UserType = undefined;   

    constructor() {
        makeObservable(this, {
          selectedUser: observable,

          setSelectedUser: action.bound,
        });
    }

    setSelectedUser(user?: UserType): void {
      runInAction(() => {
        this.selectedUser = user;
      });
    }
}

export default new UserStore();
