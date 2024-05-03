import {BaseApiClient} from "./BaseApiClient";
import {ChatType, MessageReactionType, DelayMessageType, MessageType} from "../../types/types";

class UserApiClient extends BaseApiClient {
    sendMessage(chatId: number, text: string): Promise<MessageType> {
        return this.axiosPost("/chat/send", {message: {chatId, text}})
    }

    sendDelayMessage(chatId: number, text: string, inTime: Date): Promise<DelayMessageType> {
        return this.axiosPost("/chat/send/delay", {delayMessage: {chatId, text, inTime}})
    }

    removeDelayMessage(delayMessageId: number): Promise<DelayMessageType> {
        return this.axiosPost("/chat/remove/delay", {delayMessage: {delayMessageId}})
    }

    getAllDelayMessage(delayMessageId: number): Promise<DelayMessageType[]> {
        return this.axiosGet("/chat/messages/delay/all")
    }


    createChat(userId: number): Promise<ChatType> {
        return this.axiosPost("/chat/create/chat", {createChat: {userId}})
    }

    createGroup(userIds: number[], name: string): Promise<ChatType> {
        return this.axiosPost("/chat/create/group", {createGroup: {userIds, name}})
    }

    joinGroup(joinKey: string): Promise<ChatType> {
        return this.axiosPost("/chat/join/group", {joinGroup: {joinKey}})
    }

    getMyChats(afterId: number = -1): Promise<ChatType[]> {
        // -1 for first page
        return this.axiosGet("/chat/chats/" + afterId)
    }

    getMessages(
        chatId: number,
        afterId: number,
    ): Promise<MessageType[]> {
        return this.axiosPost("/chat/messages", {chatMessages: {chatId, afterId}})
    }

    setReaction(
        messageId: number,
        reactionTypeId: number
    ): Promise<MessageReactionType> {
        return this.axiosPost('/chat/reaction', {reactionMessage: {messageId, reactionTypeId}})
    }
}

export default new UserApiClient();
