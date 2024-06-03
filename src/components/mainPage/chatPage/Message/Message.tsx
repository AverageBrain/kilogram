import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

import { MessageType } from '../../../../types';
import { authUserStore, chatsStore } from '../../../../stores';
import { Avatar } from '../../../Avatar';
import { UserProfile } from '../../../modals';
import { useModal, useTypeOfScreen } from '../../../../hooks';
import Reactions from './reactions/Reactions';
import ReactionButton from './reactions/ReactionButton';

import styles from './Message.module.scss';
import { Dropdown, MenuProps } from 'antd';
import ReactionContextMenu from './reactions/ReactionContextMenu';

type Props = {
  message: MessageType;
  isGroup: boolean;
  isAllowedReaction: boolean;
  isReactionsAlreadyOpened: boolean;
  setIsReactionsAlreadyOpened: (value: boolean) => void;
};

const Message: React.FC<Props> = ({
  message,
  isAllowedReaction,
  isGroup,
  isReactionsAlreadyOpened,
  setIsReactionsAlreadyOpened,
}) => {
  const { selectedItem: authUser } = authUserStore;
  const { selectedItem: selectedChat } = chatsStore;

  const [isHover, setIsHover] = useState(false);
  const { isOpenModal, showModal, closeModal } = useModal();
  const { isBigScreen } = useTypeOfScreen();

  const isActivePerson = authUser?.id === message.userId;
  const curUser = selectedChat?.users && selectedChat.users.find((user) => user.id === message.userId);

  const handleClickProfile = () => {
    showModal();
  };

  const mapFileUrls = (fileUrls: string[] | undefined): string => {
    if (!fileUrls) return '';

    return fileUrls.map((fileUrl) => `<div>${fileUrl}</div>`).join('\n');
  };

  const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
    {
      label: <ReactionContextMenu message={message}/>,
      className: styles['reactions-context-menu-item'],
      key: '0',
    },
  ];

  return (

    <>
      <div
        className={clsx(
          styles['message-bar'],
          isActivePerson ? styles['my-message'] : styles['partner-message'])}
      >
        {isGroup && !isActivePerson && (
          <Avatar
            className={styles['user-avatar-in-group']}
            userId={message.userId}
            size={25}
            onClick={handleClickProfile}
          />
        )}
        <Dropdown
          menu={{ items }}
          trigger={['contextMenu']}
          disabled={!isAllowedReaction}
          placement="topRight"
          onOpenChange={(open) => setIsReactionsAlreadyOpened(open)}
        >
          <div className={styles.message}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {(isGroup &&
              <div className={styles['message-title']} onClick={handleClickProfile}>
                {curUser?.name}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
            {isAllowedReaction && <Reactions message={message}/>}
            <div className={styles['message-meta']}>
              <span className={styles.timestep}>
                {moment(message.inTime ?? message.createdAt).format('LT')}
              </span>
            </div>
            {
              isBigScreen
              && !isReactionsAlreadyOpened
              && isAllowedReaction
              && <ReactionButton message={message} setVisible={isHover}/>
            }
          </div>
        </Dropdown>
      </div>
      {curUser && <UserProfile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
    </>
  );
};

export default observer(Message);
