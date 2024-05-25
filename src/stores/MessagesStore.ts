
import { action, makeObservable, override, reaction, runInAction } from 'mobx';
import { MessageReactionType, MessageType } from '../types';
import BaseStore from './BaseStore';
import { chatApiClient } from '../hands';
import { partition } from 'lodash';

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
      setReaction: action.bound,
      removeReaction: action.bound,
      updateMessageByReaction: action.bound,
      updateMessageByRemoveReaction: action.bound,
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
      
  async setReaction(messageId: number, reactionTypeId: number) {
    try {
        await chatApiClient.setReaction(messageId, reactionTypeId);
    } catch (e: any) {
        console.warn(e);
        return false;
    } finally {
        this.disableLoading();
    }
  }

  async removeReaction(messageId: number, reactionTypeId: number) {
    try {
        await chatApiClient.removeReaction(messageId, reactionTypeId);
    } catch (e: any) {

        console.warn(e);
        return false;
    } finally {
        this.disableLoading();
    }
  }

  updateMessageByReaction(messageId: number, reaction: MessageReactionType, type: 'deleted' | 'set'): void {
    const message = this.items.find((message) => (message.id == messageId)); 
    if (!message) return
    const updatedmessage = this.items;
    
    updatedmessage.map(item => {
      if (item.id === messageId) {
        if (item.reactions) {
          const [_, otherReaction] = partition(
            item.reactions,
            (item) => item.id === reaction.id,
          );
          item.reactions = type === 'set' ? [...otherReaction, reaction] : [...otherReaction];
        } else if (type === 'set') {
          item.reactions = [reaction];
        }
      }
    });

    runInAction(() => {
      this.items = [...updatedmessage];
    });
  }
  
  updateMessageByRemoveReaction(messageId: number, reactionId: number): void {
    const message = this.items.find((message) => (message.id == messageId)); 
    if (!message) return
    const updatedmessage = this.items;
    
    updatedmessage.map(item => {
      if (item.id === messageId) {
        if (item.reactions) {
          const [otherReaction] = partition(
            item.reactions,
            (item) => item.id === reactionId,
          );
          item.reactions = [...otherReaction];
        }

      }
    });
    runInAction(() => {
      this.items = [...updatedmessage];
    });
  }
}

export default new MessagesStore();
