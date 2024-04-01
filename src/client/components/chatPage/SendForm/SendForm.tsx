import React from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './index.css'

const SendMessage: React.FC = () => {
  return (
    <Form className="send-message">
      <Input.TextArea
        placeholder="Введите сообщение..."
      />
      <button><SendOutlined /></button>
    </Form>
  );
};

export default SendMessage;
