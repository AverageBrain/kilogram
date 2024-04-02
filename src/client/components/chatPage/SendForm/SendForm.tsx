import React, { useRef, useState } from 'react';
import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './SendForm.css'

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = () => {
    setMessage('');
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
        autoFocus
        ref={inputRef}
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

export default SendMessage;
