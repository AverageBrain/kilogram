import { MessageType } from "../types";
import { chatsStore, messagesStore } from "../stores";

export const processSSEMessage = async (data: any) => {
    if (data['type'] === 'newMessage') {
        const message: MessageType = data['data']['message'];

        if (chatsStore.selectedItem?.id === message?.chatId) {
            messagesStore.updateMessages([message]);
        }
        chatsStore.updateChats(message);
    }
}