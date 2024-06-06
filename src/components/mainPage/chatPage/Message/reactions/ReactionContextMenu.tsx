import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../../types';
import { reactionsStore } from '../../../../../stores';
import { useReaction } from '../../../../../hooks/useReaction';
import styles from '../Message.module.scss';

type Props = {
  message: MessageType;
};

const ReactionContextMenu: React.FC<Props> = ({ message }) => {
  const { items } = reactionsStore;
  const { handleReaction } = useReaction(message);

  return (
    <div
      className={
        clsx(
          styles['reactions-context-menu'],
        )
      }
    >
      {items.map((item) => (
        <span
          key={item.id}
          onClick={() => handleReaction(item.emoji)}
          className={styles.reaction}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default observer(ReactionContextMenu);
