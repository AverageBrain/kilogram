
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

    async loadItems(chatId: number, afterId: number = -1, update?: boolean): Promise<boolean> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.getMessages(chatId, afterId);
  
        runInAction(() => {
          if (update) {
            this.items = [...this.items, ...data];
          } else {
            this.items = data;
          }
        });
        return data.length > 0;
      } catch (e: any) {
        console.warn(e);
        return false;
      } finally {
        this.disableLoading();
      }
    }

    async sendMessage(chatId: number, text: string): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.sendMessage(chatId, text);
  
        this.updateMessages([data]);
        chatsStore.updateChats(data);
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    updateMessages(messages: MessageType[]): void {
      runInAction(() => {
          this.items = [...messages, ...this.items];
      });
    }
}

export default new MessagesStore();
