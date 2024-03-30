import { FC } from 'react';
import { Form, Input, Button } from 'antd';

export const SendMessage: FC = () => {

  return (
    <Form className="send-message">
      <Input.TextArea
        placeholder="Введите сообщение..."
      />
      <Button>Send</Button>
    </Form>
  );
};
