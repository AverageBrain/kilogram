import {
  action, makeObservable, observable, runInAction,
} from 'mobx';

class BaseStore<T> {
  loading: boolean = false;

  selectedItem?: T = undefined;

  items: T[] = [];

  constructor() {
    makeObservable(this, {
      loading: observable,
      selectedItem: observable,
      items: observable,

      enableLoading: action.bound,
      disableLoading: action.bound,
      resetItems: action.bound,
    });
  }

  resetItems(): void {
    runInAction(() => {
      this.items = [];
    });
  }

  enableLoading(): void {
    runInAction(() => {
      this.loading = true;
    });
  }

  disableLoading(): void {
    runInAction(() => {
      this.loading = false;
    });
  }
}

export default BaseStore;
