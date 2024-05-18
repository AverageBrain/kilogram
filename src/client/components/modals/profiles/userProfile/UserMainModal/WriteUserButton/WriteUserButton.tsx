import React from 'react';
import { UserType } from '../../../../../../../types';
import { chatsStore, messagesStore, userStore } from '../../../../../../stores';
import { Button } from 'antd';
import './WriteUserButton.css';
import { Divider } from '../../../../commonComponents/divider';

type Props = {
  user: UserType;
  closeModal: () => void;
}

export const WriteUserButton: React.FC<Props> = ( { user, closeModal } ) => {
  const { setSelectedChat } = chatsStore;
  const { setSelectedUser } = userStore;
  const { clearMessages } = messagesStore;

  const handleClick = async () => {
    const chat = chatsStore.getChatByUser(user);
    if (chat) {
      setSelectedChat(chat);
      closeModal();
    } else {
      setSelectedUser(user);
      setSelectedChat(undefined);
      closeModal();
      clearMessages();
    }
  };

  return (
    <>
      <Divider />
      <Button className="write-user-button" type="text" size="large" onClick={handleClick}>
        Написать сообщение
      </Button>
    </>
  );
}
