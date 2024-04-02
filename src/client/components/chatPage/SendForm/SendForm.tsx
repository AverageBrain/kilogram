import React from 'react';
import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './SendForm.css'

const SendMessage: React.FC = () => {
  return (
    <Form className="send-message">
      <Input.TextArea
        variant="borderless"
        placeholder="Введите сообщение..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <button><SendOutlined /></button>
    </Form>
  );
};

export default SendMessage;
