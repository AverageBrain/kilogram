
import { action, makeObservable, override, runInAction } from 'mobx';
import { ChatType } from '../../types';
import BaseStore from './BaseStore';
import { chatApiClient } from '../hands';

class ChatsStore extends BaseStore<ChatType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadItems: action.bound,
            createChat: action.bound,
        });
    }

    async loadItems(): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.getMyChats();
  
        runInAction(() => {
          this.items = data;
        });
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    async createChat(userId: number): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.createChat(userId);
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

export default new ChatsStore();
