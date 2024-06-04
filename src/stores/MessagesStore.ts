import { action, makeObservable, override, observable, runInAction } from 'mobx';
import { message } from 'antd';
import { partition } from 'lodash';
import axios from 'axios';

import { MessageReactionType, MessageType } from '../types';
import { chatApiClient } from '../hands';
import BaseStore from './BaseStore';

class MessagesStore extends BaseStore<MessageType> {
  abortController = new AbortController();

  constructor() {
    super();
    makeObservable(this, {
      items: override,
      selectedItem: override,
      loading: override,

      abortController: observable,

      loadMessages: action.bound,
      loadDelayedMessages: action.bound,
      sendMessage: action.bound,
      updateMessages: action.bound,
      sendDelayMessage: action.bound,
      setReaction: action.bound,
      removeReaction: action.bound,
      updateMessageByReaction: action.bound,
      updateMessageByRemoveReaction: action.bound,
      doAbortController: action.bound,
    });
  }

  async loadMessages(chatId: number, afterId = -1, update?: boolean): Promise<boolean> {
    try {
      this.enableLoading();
      this.doAbortController();

      console.log(this.abortController.signal);
      const data = await chatApiClient.getMessages(chatId, afterId, this.abortController.signal);

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
      // TODO: не высвечивать ошибку об аборте
      if (!axios.isCancel(e)) {
        message.error('Не удалось получить сообщения');
      }

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
      message.error('Не удалось получить сообщения');
      console.warn(e);

      return false;
    } finally {
      this.disableLoading();
    }
  }

  async sendMessage(chatId: number, text: string, files: File[]): Promise<void> {
    try {
      this.enableLoading();

      await chatApiClient.sendMessage(chatId, text, files);
    } catch (e: any) {
      message.error('Не удалось отправить сообщение');
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

  async sendDelayMessage(chatId: number, text: string, files: File[], inTime: Date): Promise<void> {
    try {
      this.enableLoading();

      await chatApiClient.sendDelayMessage(chatId, text, files, inTime);
    } catch (e: any) {
      message.error('Не удалось отправить сообщение');
      console.warn(e);
    } finally {
      this.disableLoading();
    }
  }

  async setReaction(messageId: number, reactionTypeId: number) {
    try {
      await chatApiClient.setReaction(messageId, reactionTypeId);
    } catch (e: any) {
      message.error('Не удалось поставить реакцию');
      console.warn(e);
    }
  }

  async removeReaction(messageId: number, reactionTypeId: number) {
    try {
      await chatApiClient.removeReaction(messageId, reactionTypeId);
    } catch (e: any) {
      message.error('Не удалось убрать реакцию');
      console.warn(e);
    }
  }

  updateMessageByReaction(messageId: number, reaction: MessageReactionType, type: 'deleted' | 'set'): void {
    const message = this.items.find((message) => (message.id == messageId));
    if (!message) return;
    const updatedmessage = this.items;

    updatedmessage.map((item) => {
      if (item.id === messageId) {
        if (item.reactions) {
          const [firstReaction, otherReaction] = partition(
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
    if (!message) return;
    const updatedmessage = this.items;

    updatedmessage.map((item) => {
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

  doAbortController() {
    this.abortController.abort();
    console.log('aborted', this.abortController.signal);
    this.abortController = new AbortController();
  }
}

export default new MessagesStore();
