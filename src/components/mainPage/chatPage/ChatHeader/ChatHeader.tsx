import React from 'react';
import { Dropdown, Layout, MenuProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useModal } from '../../../../hooks/useModal';
import { chatsStore, messagesStore, userStore } from '../../../../stores';
import { TypeOfChat } from '../../../../types/types';
import { GroupProfile, UserProfile } from '../../../modals';
import { getHandle } from '../../../../utils';
import { useTypeOfScreen } from '../../../../hooks';

import styles from './ChatHeader.module.scss';
import buttonStyles from '../../../../styles/buttons.module.scss';

const { Header: HeaderAD } = Layout;

type Props = {
  isToolbarHidden: boolean;
  setIsToolbarHidden: (value: boolean) => void;
};

const ChatHeader: React.FC<Props> = ({ isToolbarHidden, setIsToolbarHidden }) => {
  const { selectedItem: chat, setSelectedChat } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;
  const { resetItems } = messagesStore;

  const { isOpenModal, showModal, closeModal } = useModal();
  const { isBigScreen } = useTypeOfScreen();

  const isGroup = !!chat && chat.type === TypeOfChat.Group;
  const curUser = chat ? chat.users[0] : user;
  const membersCount = isGroup ? chat.users.length + 1 : undefined;

  const handleBack = () => {
    setSelectedChat(undefined);
    setSelectedUser(undefined);
    resetItems();
  };

  const toggleToolbarHidden = () => {
    setIsToolbarHidden(!isToolbarHidden);
  };

  const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
    {
      label: isToolbarHidden ? 'Включить текстовые настройки' : 'Скрыть текстовые настройки',
      onClick: toggleToolbarHidden,
      key: '0',
    },
  ];

  return (
    <>
      <HeaderAD className={styles['chat-header']}>
        {!isBigScreen
          && (
          <div className={clsx(buttonStyles['small-icon-svg-button'], styles['back-button'])} onClick={handleBack}>
            <ArrowLeftOutlined />
          </div>
          )}
        <div className={styles.info} onClick={showModal}>
          <div className={styles['text-info']}>
            <span className={styles.name}>{isGroup ? chat.name : (curUser?.name ?? 'Удаленный пользователь')}</span>
            <span className={styles.description}>
              {getHandle({ isGroup, membersCount, user: curUser })}
            </span>
          </div>
        </div>
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={clsx(buttonStyles['big-icon-svg-button'])}>
            <MoreOutlined />
          </span>
        </Dropdown>
      </HeaderAD>
      {isGroup
        ? <GroupProfile group={chat} isOpenModal={isOpenModal} closeModal={closeModal} />
        : curUser && <UserProfile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
    </>
  );
};

export default observer(ChatHeader);
