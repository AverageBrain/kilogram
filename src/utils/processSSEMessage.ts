import {MessageType, ReactionWithMessageInfoType} from "../types";
import {chatsStore, messagesStore, reactionsStore} from "../stores";

const _processEvents: Set<string> = new Set();

export const processSSEMessage = async (data: any) => {
    if (_processEvents.has(data['eventId'])) {
        return
    }
    _processEvents.add(data['eventId'])

    if (data['type'] === 'newMessage') {
        const message: MessageType = data['data']['message'];

        if (chatsStore.selectedItem?.id === message?.chatId) {
            messagesStore.updateMessages([message]);
        }
        chatsStore.updateChats(message);
        window.navigator.vibrate(100);
    } else if (data['type'] === 'newReaction' || data['type'] === 'removeReaction') {
        const {messageId, reactionTypeId, ...other}: ReactionWithMessageInfoType = data['data'];

        const reaction = reactionsStore.items.find((item) => item.id === reactionTypeId);
        const message = messagesStore.items.find((item) => item.id === messageId);
        const type = data['type'] === 'newReaction' ? 'set' : 'deleted';

        if (message && reaction) {
            messagesStore.updateMessageByReaction(messageId, {
                ...other,
                reactionType: reaction,
            }, type);
        }
        window.navigator.vibrate(100);
    } else if (data['type'] === 'userStatus') {
        const userId = data['data']['userId'];
        const status = data['data']['status'];
        const lastSeen = data['data']['lastSeen'];

        chatsStore.updateStatusChats(userId, status, lastSeen);
    }
}