import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../types'
import { authUserStore } from '../../../../stores';
import { Avatar } from '../../../Avatar';

import styles from './Message.module.scss';

import Reactions from './reactions/Reactions';
import ReactionButton from './reactions/ReactionButton';

type Props = {
  message: MessageType;
  isGroup: boolean;
}

const Message: React.FC<Props> = ({ message, isGroup }) => {
  const { selectedItem } = authUserStore;
  const [ isHover, setIsHover ] = useState(false);

  const isActivePerson = selectedItem?.id === message.userId;
  return (

    <>
      <div
        className={clsx(
          styles['message-bar'],
          isActivePerson ? styles['my-message'] : styles['partner-message'])}
      >
        {isGroup && !isActivePerson && <Avatar className={styles['user-avatar-in-group']} userId={message.userId} size={25} />}
        <div className={styles['message']}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
          <Reactions message={message}/>
          <div className={styles['message-meta']}>
            <span className={styles['timestep']}>
              {moment(message.inTime ?? message.createdAt).format('LT')}
            </span>
          </div>
          <ReactionButton message={message} setVisible={isHover}/>
        </div>
      </div>

    </>
  );
  function mapFileUrls(fileUrls: string[] | undefined): string {
      if (!fileUrls) return ''
      return fileUrls.map(fileUrl => `<div>${fileUrl}</div>`).join('\n')
  }
};

export default observer(Message);
