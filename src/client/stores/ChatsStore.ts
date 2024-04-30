
import { action, makeObservable, override, runInAction } from 'mobx';
import { partition } from 'lodash';

import { ChatType, MessageType, UserType } from '../../types';
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
            setSelectedChat: action.bound,
            updateChats: action.bound,
            createGroup: action.bound,
            updateGroups: action.bound,
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

    async createGroup(userIds: number[], name: string): Promise<void> {
      try {
        this.enableLoading();
      
        const data = await chatApiClient.createGroup(userIds, name);
        runInAction(() => {
          this.selectedItem = data;
        });
      } catch (e: any) {
        console.warn(e);
      } finally {
        this.disableLoading();
      }
    }

    setSelectedChat(chat?: ChatType) {
      runInAction(() => {
        this.selectedItem = chat;
      });
    }

    getChatByUser(user: UserType) {
      for (let item of this.items) {
        if (item.users[0].id === user.id)
          return item;
      }
    }

    async updateChats(message: MessageType) {
      const [updatedChats, otherChats] = partition(
        this.items,
        (item) => item.id === message.chatId,
      );
      if (updatedChats.length === 0) {
        await this.loadItems();
      } else {
        const updatedChat: ChatType = {
          ...updatedChats[0],
          messages: [message],
        };  

        runInAction(() => {
          this.items = [updatedChat, ...otherChats];
        });
      }
    }

    async updateGroups(chat: ChatType) {
      runInAction(() => {
        this.items = [chat, ...this.items];
      });
    }
}

export default new ChatsStore();
