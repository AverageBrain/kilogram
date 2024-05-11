import React from 'react';
import { Layout } from 'antd';
import './ChatHeader.css'
import { useModal } from '../../../../hooks/useModal';
import { observer } from 'mobx-react-lite';
import { chatsStore, userStore } from '../../../stores';
import { TypeOfChat } from '../../../../types/types';
import { GroupProfile, UserProfile } from '../../modals';
import { getCorrectMemberCase } from '../../../utils';

const { Header: HeaderAD } = Layout;

const ChatHeader: React.FC = () => {
  const { selectedItem: chat } = chatsStore;
  const { selectedUser: user } = userStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const isGroup = !!chat && chat.type === TypeOfChat.Group;
  const curUser = chat ? chat.users[0] : user;
  const membersCount = isGroup ? chat.users.length + 1 : undefined;

  return curUser
    ? (
      <>
        <HeaderAD className='chat-header'>
          <div className='info' onClick={showModal}>
            <span className='name'>{isGroup ? chat.name : curUser.name}</span>
            {isGroup 
              ? <span className='description'>
                  {membersCount} {getCorrectMemberCase(membersCount)}
                </span>
              : (<span className='description'>
                  {curUser.lastSeen ? curUser.lastSeen : 'был в сети недавно'}
                </span>)
            }
          </div>
        </HeaderAD>
        {isGroup
          ? <GroupProfile group={chat} isOpenModal={isOpenModal} closeModal={closeModal} />
          : <UserProfile user={curUser} isOpenModal={isOpenModal} closeModal={closeModal} />}
      </>
    )
    : <></>;
};

export default observer(ChatHeader);
