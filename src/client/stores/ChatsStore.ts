
import {
  action,
  makeObservable,
  observable,
  override,
  runInAction,
} from 'mobx';
import { partition } from 'lodash';

import { ChatType, MessageType, MetadataType, UserType } from '../../types';
import BaseStore from './BaseStore';
import { chatApiClient } from '../hands';

class ChatsStore extends BaseStore<ChatType> {
  constructor() {
      super();
      makeObservable(this, {
          items: override,
          selectedItem: override,
          loading: override,

          responseError: observable,

          loadItems: action.bound,
          createChat: action.bound,
          setSelectedChat: action.bound,
          updateChats: action.bound,
          createGroup: action.bound,
          updateGroups: action.bound,
          getGroupByJoinKey: action.bound,
          joinGroup: action.bound,
          getMetadata: action.bound,
      });
  }

  responseError?: string = undefined;

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
      if (item.type === 'chat' && item.users[0] && item.users[0].id === user.id)
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

  updateGroups(chat: ChatType) {
    runInAction(() => {
      this.items = [chat, ...this.items];
    });
  }

  async getGroupByJoinKey(joinKey: string): Promise<void> {
    try {
      this.enableLoading();
    
      const data = await chatApiClient.getGroupByJoinKey(joinKey);

      runInAction(() => {
        this.selectedItem = data;
        this.setResponseError('');
      });
    } catch (e: any) {
      console.warn(e);
      this.setResponseError(e.response.data.message);
    } finally {
      this.disableLoading();
    }
  }

  async joinGroup(joinKey: string): Promise<void> {
    try {
      this.enableLoading();
    
      const data = await chatApiClient.joinGroup(joinKey);

      runInAction(() => {
        this.selectedItem = data;
      });
    } catch (e: any) {
      console.warn(e);
    } finally {
      this.disableLoading();
    }
  }

  async getMetadata(url: string): Promise<MetadataType | void> {
    try {
      this.enableLoading();
    
      const data = await chatApiClient.getMetadata(url);

      return data;
    } catch (e: any) {
      console.warn(e);
    } finally {
      this.disableLoading();
    }
  }

  private setResponseError(value: string) {
    runInAction(() => {
      this.responseError = value;
    });
  }
}

export default new ChatsStore();
