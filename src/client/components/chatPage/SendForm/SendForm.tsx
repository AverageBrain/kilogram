import React from 'react';
import { Form, Input, Button } from 'antd';

const SendMessage: React.FC = () => {
  return (
    <Form className="send-message">
      <Input.TextArea
        placeholder="Введите сообщение..."
      />
      <Button>Send</Button>
    </Form>
  );
};

export default SendMessage;
