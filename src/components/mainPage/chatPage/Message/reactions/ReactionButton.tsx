import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import clsx from 'clsx';
import { MessageType } from '../../../../../types';

import styles from '../Message.module.scss';
import { reactionsStore } from '../../../../../stores';
import { useReaction } from '../../../../../hooks/useReaction';

type Props = {
  message: MessageType;
  setVisible: boolean;
};

const ReactionButton: React.FC<Props> = ({ message, setVisible }) => {
  const { items } = reactionsStore;
  const [closeToReaction, setCloseToReaction] = useState(false);
  const [isReactionBarShowed, setIsReactionBarShowed] = useState(false);
  const { handleReaction } = useReaction(message);

  const increaseButton = () => {
    setCloseToReaction(true);
  };

  const decreaseButton = () => {
    setCloseToReaction(false);
    setIsReactionBarShowed(false);
  };

  const showReactionBar = () => {
    setIsReactionBarShowed(true);
  };

  return (
    <div
      className={
        clsx(
          setVisible && styles['show-reaction'],
          styles['reaction-button-wrapper'],
        )
      }
      onMouseEnter={increaseButton}
      onMouseLeave={decreaseButton}
    >
      <div
        className={
          clsx(
            styles['reaction-button'],
            closeToReaction && styles['close-to-reaction'],
            isReactionBarShowed && styles['reaction-bar'],
          )
        }
        onMouseEnter={showReactionBar}
      >
        {
        !isReactionBarShowed
          ? (
            <span className={styles['preview-reaction']}>
              {items[0].emoji}
            </span>
          )
          : (
            <div className={styles['reaction-bar']}>
              {
              items.map((item) => (
                <span
                  key={item.id}
                  onClick={() => handleReaction(item.emoji)}
                  className={styles.reaction}
                >
                  {item.emoji}
                </span>
              ))
            }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default observer(ReactionButton);
