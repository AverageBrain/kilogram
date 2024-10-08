import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../../types'

import styles from '../Message.module.scss';
import { Dictionary, groupBy } from 'lodash';
import { Avatar } from '../../../../Avatar';
import { authUserStore, messagesStore, reactionsStore } from '../../../../../stores';
import clsx from 'clsx';
import { MessageReactionType } from '../../../../../types/types';
import { useReaction } from '../../../../../hooks/useReaction';


type Props = {
  message: MessageType;
}

const Reactions: React.FC<Props> = ({ message }) => {
  const { isAuthUserReaction, handleReaction } = useReaction(message);
  
  const { selectedItem } = authUserStore;

  const [ reactions, setReactions ] = useState<Dictionary<MessageReactionType[]>>({});

  useEffect(() => {
    setReactions(groupBy(message.reactions, (reaction) => reaction.reactionType.emoji))
  }, [message.reactions]);
  
  return (
    <>
      {selectedItem && <ul className={styles['reactions']}>
        {Object.keys(reactions).map(
          (emoji, index) => (
            <li 
              className={clsx(
                styles['reaction-wrapper'], 
                isAuthUserReaction(emoji) && styles['auth-user-reaction']
              )}
              onClick={() => handleReaction(emoji)}
              key={index}
            >
              <span className={styles['emoji']}>{emoji}</span>
              <span className={styles['emoji-info']}>
                {reactions[emoji].length === 1
                  ? <Avatar className={styles['user']} size={20} userId={reactions[emoji][0].userId}/>
                  : <span className={styles['reaction-number']}>{reactions[emoji].length}</span>}
              </span>
            </li>
          )
        )}
      </ul>}
    </>
  );
};

export default observer(Reactions);
