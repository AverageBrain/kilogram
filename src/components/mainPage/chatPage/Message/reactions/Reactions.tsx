import React from 'react';

import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../../types'

import styles from '../Message.module.scss';
import { groupBy } from 'lodash';
import { Avatar } from '../../../../Avatar';

type Props = {
  message: MessageType;
}

const Reactions: React.FC<Props> = ({ message }) => {
  const reactions = groupBy(message.reactions, (reaction) => reaction.reactionType.emoji);

  return (
    <ul className={styles['reactions']}>
      {Object.keys(reactions).map(
        (emoji, index) => (
          <li className={styles['reaction-wrapper']} key={index}>
            <span className={styles['emoji']}>{emoji}</span>
            <span className={styles['emoji-info']}>
              {reactions[emoji].length === 1
                ? <Avatar className={styles['user']} size={20} userId={reactions[emoji][0].userId}/>
                : <span className={styles['reaction-number']}>{reactions[emoji].length}</span>}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

export default observer(Reactions);
