import {BaseApiClient} from "./BaseApiClient";
import {ChatType, MessageType} from "../../types/types";

class UserApiClient extends BaseApiClient {
    sendMessage(chatId: number, text: string): Promise<MessageType> {
        return this.axiosPost("/chat/send", {message: {chatId: chatId, text: text}})
    }

    createChat(userId: number): Promise<ChatType> {
        return this.axiosPost("/chat/create/chat", {createChat: {userId}})
    }

    createGroup(userIds: number[]): Promise<ChatType> {
        return this.axiosPost("/chat/create/chat", {createGroup: {userIds}})
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
