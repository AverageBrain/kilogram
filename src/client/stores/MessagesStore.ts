
import { action, makeObservable, override, runInAction } from 'mobx';
import { MessageType } from '../../types';
import BaseStore from './BaseStore';
import { chatApiClient } from '../hands';

class MessagesStore extends BaseStore<MessageType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadItems: action.bound,
            sendMessage: action.bound,
        });
    }

    async loadItems(chatId: number, afterId: number = -1): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.getMessages(chatId, afterId);
  
        runInAction(() => {
          this.items = data;
        });
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    async sendMessage(chatId: number, text: string): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.sendMessage(chatId, text);
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

export default new MessagesStore();
