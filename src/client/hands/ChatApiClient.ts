import {BaseApiClient} from "./BaseApiClient";
import {ChatType, DelayMessageType, MessageType} from "../../types/types";

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

    createGroup(userIds: number[]): Promise<ChatType> {
        return this.axiosPost("/chat/create/group", {createGroup: {userIds}})
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
        offset: number,
    ): Promise<MessageType[]> {
        return this.axiosPost("/chat/messages", {chatMessages: {chatId, offset}})
    }
}

export default new UserApiClient();
