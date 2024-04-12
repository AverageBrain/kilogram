import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import './SendForm.css'
import { chatsStore, messagesStore } from '../../../stores';

const SendMessage: React.FC = () => {
  const { loadItems, sendMessage } = messagesStore;
  const { selectedItem: chat } = chatsStore;

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async () => {
    if (chat) {
      await sendMessage(chat.id, message);      
      setMessage('');

      await loadItems(chat.id);
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
