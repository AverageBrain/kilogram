import { BaseApiClient } from "./BaseApiClient";
import { ChatType, MessageType} from "../../types/types";

class UserApiClient extends BaseApiClient {
    sendMessage(chatId: number, text: string): Promise<MessageType> {
        return this.axiosPost("/chat/send", {message: {chatId: chatId, text: text}})
    }

    createChat(userId: number): Promise<ChatType> {
        return this.axiosPost("/chat/create", { createChat: { userId } })
    }

    getMyChats(afterId: number = -1): Promise<ChatType[]> {
        // -1 for first page
        return this.axiosGet("/chat/chats/" + afterId)
    }

    getMessages(
        chatId: number,
        afterId: number, // first message were already in Chat
    ): Promise<MessageType[]> {
        return this.axiosPost("/chat/messages", {chatId: chatId, afterId: afterId})
    }
}

export default new UserApiClient();
