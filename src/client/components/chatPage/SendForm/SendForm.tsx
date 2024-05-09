import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import './SendForm.css'
import { chatsStore, messagesStore, userStore } from '../../../stores';
import { chatApiClient } from '../../../hands';

const SendMessage: React.FC = () => {
  const { sendMessage } = messagesStore;
  const { selectedItem: chat, setSelectedChat } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [message, setMessage] = useState(''); // TODO: при смене чата очищать поле/подгружать из localStorage

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async () => {
    if (chat && message) {
      await sendMessage(chat.id, message);      
      setMessage('');
    }
    if (!chat && user && message) {
      const chat = await chatApiClient.createChat(user.id);
      await sendMessage(chat.id, message);
      setSelectedChat(chat);
      setSelectedUser(undefined);
      setMessage('');
    }
  }

  const handleEnter = (e: React.KeyboardEvent<Element>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Form className="send-message">
      <Input.TextArea
        value={message}
        variant="borderless"
        placeholder="Введите сообщение..."
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button onClick={handleSubmit}>
        <SendOutlined />
      </button>
    </Form>
  );
};

export default observer(SendMessage);
