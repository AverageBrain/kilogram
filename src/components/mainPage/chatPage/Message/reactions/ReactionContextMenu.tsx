import React from 'react';

import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../../types';

import styles from '../Message.module.scss';
import { reactionsStore } from '../../../../../stores';
import clsx from 'clsx';
import { useReaction } from '../../../../../hooks/useReaction';

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
      {items.map((item) =>
          <span
            key={item.id}
            onClick={() => handleReaction(item.emoji)}
            className={styles.reaction}
          >
            {item.emoji}
          </span>,
      )}
    </div>
  );
};

export default observer(ReactionContextMenu);
