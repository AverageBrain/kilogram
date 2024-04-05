import {BaseApiClient} from "./BaseApiClient";
import {Chat, Message} from "../types";

export class UserApiClient extends BaseApiClient {
    sendMessage(chatId: number, text: string): Promise<Message> {
        return this.axiosPost("/chat/send", {message: {chatId: chatId, text: text}})
    }

    createChat(userId: number): Promise<Chat> {
        return this.axiosPost("/chat/create", {message: {chatId: userId}})
    }

    getMyChats(afterId: number = -1): Promise<Chat[]> {
        // -1 for first page
        return this.axiosGet("/chat/chats/" + afterId)
    }

    getMessages(
        chatId: number,
        afterId: number, // first message were already in Chat
    ): Promise<Message[]> {
        return this.axiosPost("/chat/messages", {chatId: chatId, afterId: afterId})
    }
}
