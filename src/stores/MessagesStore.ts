
import { action, makeObservable, override, runInAction } from 'mobx';
import { MessageType } from '../types';
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

            loadMessages: action.bound,
            loadDelayedMessages: action.bound,
            sendMessage: action.bound,
            updateMessages: action.bound,
            clearMessages: action.bound,
            sendDelayMessage: action.bound,
        });
    }

    async loadMessages(chatId: number, afterId: number = -1, update?: boolean): Promise<boolean> {
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

    async loadDelayedMessages(chatId: number, beforeInTime?: Date, update?: boolean): Promise<boolean> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.getDelayMessages(chatId, beforeInTime);
  
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
      
        await chatApiClient.sendMessage(chatId, text);
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    clearMessages(): void {
      this.items = [];
    }

    updateMessages(messages: MessageType[]): void {
      runInAction(() => {
          this.items = [...messages, ...this.items];
      });
    }

    async sendDelayMessage(chatId: number, text: string, inTime: Date): Promise<void> {
      try {
        this.enableLoading();
      
        await chatApiClient.sendDelayMessage(chatId, text, inTime);  
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }
}

export default new MessagesStore();
