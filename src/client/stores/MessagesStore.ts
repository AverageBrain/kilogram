
import { action, makeObservable, override, runInAction } from 'mobx';
import { MessageType } from '../../types';
import BaseStore from './BaseStore';
import { chatApiClient } from '../hands';
import { chatsStore } from '.';

class MessagesStore extends BaseStore<MessageType> {
    constructor() {
        super();
        makeObservable(this, {
            items: override,
            selectedItem: override,
            loading: override,

            loadItems: action.bound,
            sendMessage: action.bound,
            updateMessages: action.bound,
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
  
        this.updateMessages(data);
        chatsStore.updateChats(data);
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    updateMessages(message: MessageType): void {
      runInAction(() => {
          this.items = [message, ...this.items];
      });
    }
}

export default new MessagesStore();
