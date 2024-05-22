import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../types'
import { authUserStore } from '../../../../stores';
import { Avatar } from '../../../Avatar';

import styles from './Message.module.scss';

type Props = {
  message: MessageType;
  isGroup: boolean;
}

const Message: React.FC<Props> = ({ message, isGroup }) => {
  const { selectedItem } = authUserStore;

  const reactions = new Map<string, number>()
  message.reactions?.forEach(r => {
    const count = reactions.get(r.reactionType.emoji)
    if (count)
      reactions.set(r.reactionType.emoji, count + 1)
    else
      reactions.set(r.reactionType.emoji, 1)
  })

  const isActivePerson = selectedItem?.id === message.userId;
  return (

    <>
      <div className={clsx(styles['message'], isActivePerson ? styles['my-message'] : styles['partner-message'])}>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
        <div className={styles['message-meta']}>
          <span className={styles['timestep']}>
            {moment(message.inTime ?? message.createdAt).format('LT')}
          </span>
          {isGroup && !isActivePerson && <Avatar userId={message.userId} size={25} />}
        </div>

        <div className={styles['reactions']}>
            {
                Array(...reactions.keys()).map((emoji, index) => (
                    <div key={index}>{emoji}</div>
                ))
            }
        </div>

      </div>

    </>
  );
};

export default observer(Message);
