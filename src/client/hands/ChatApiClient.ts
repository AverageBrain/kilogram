import {BaseApiClient} from "./BaseApiClient";
import {ChatType, MessageReactionType, MessageType, MetadataType} from "../../types/types";

class UserApiClient extends BaseApiClient {
    sendMessage(chatId: number, text: string): Promise<MessageType> {
        return this.axiosPost("/chat/send", {message: {chatId, text}})
    }

    sendDelayMessage(chatId: number, text: string, inTime: Date): Promise<MessageType> {
        return this.axiosPost("/chat/send/delay", {delayMessage: {chatId, text, inTime}})
    }

    removeDelayMessage(delayMessageId: number): Promise<MessageType> {
        return this.axiosPost("/chat/delete/delay", {delayMessage: {delayMessageId}})
    }

    getDelayMessages(chatId: number, beforeInTime?: Date): Promise<MessageType[]> {
        return this.axiosPost("/chat/messages/delay", { chatMessages: { chatId, beforeInTime } })
    }

    createChat(userId: number): Promise<ChatType> {
        return this.axiosPost("/chat/create/chat", {createChat: {userId}})
    }

    createGroup(userIds: number[], name: string): Promise<ChatType> {
        return this.axiosPost("/chat/create/group", {createGroup: {userIds, name}})
    }

    getGroupByJoinKey(joinKey: string): Promise<ChatType> {
        return this.axiosGet(`chat/group/${joinKey}`);
    }

    joinGroup(joinKey: string): Promise<ChatType> {
        return this.axiosPost("/chat/group/join", {joinGroup: {joinKey}})
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

    getMetadata(url: string): Promise<MetadataType> {
        return this.axiosPost('/chat/metadata', { url });
    }
}

export default new UserApiClient();
