import { useEffect, useState } from 'react';
import { MessageReactionType, MessageType } from '../types';
import { authUserStore, messagesStore, reactionsStore } from '../stores';

export const useReaction = (message: MessageType) => {
  const { selectedItem } = authUserStore;
  const [authUserReaction, setAuthUserReaction] = useState<MessageReactionType | null>(null);
  const { items } = reactionsStore;
  const { setReaction, removeReaction } = messagesStore;

  const isAuthUserReaction = (emoji: string) => emoji === authUserReaction?.reactionType.emoji;

  useEffect(() => {
    if (message.reactions) {
      const userReaction = message.reactions.find((reaction) => (reaction.userId === selectedItem?.id));
      if (userReaction) {
        setAuthUserReaction(userReaction);
      } else {
        setAuthUserReaction(null);
      }
    }
  }, [message.reactions]);

  const handleReaction = async (emoji: string) => {
    const curReaction = items.find((reactionType) => reactionType.emoji === emoji);
    if (!isAuthUserReaction(emoji) && curReaction) {
      await setReaction(message.id, curReaction.id);
    }
    if (isAuthUserReaction(emoji) && curReaction) {
      await removeReaction(message.id, curReaction.id);
    }
  };

  return { isAuthUserReaction, setAuthUserReaction, handleReaction, authUserReaction };
};
