import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Dropdown, MenuProps, DatePicker, Button, Flex } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useModal } from '../../../../hooks';
import { messagesStore } from '../../../stores';
import { DelayMessageModal } from '../../modals';

import './SendButton.css';

type Props = {
  disabledDelay: boolean;
  onSubmit: (delayDate?: Date) => void;
};

const SendButton: React.FC<Props> = ({ disabledDelay, onSubmit }) => {
  const { loading } = messagesStore;
  const { isOpenModal, showModal, closeModal } = useModal();

  const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
    {
      label: 'Отложенное сообщение',
      onClick: showModal,
      key: '0',
      disabled: disabledDelay,
    },
  ];

  const handleSendMessage = () => onSubmit();

  return (
    <>
      {loading 
      ? <Spin className="send-button" />
      : (
        <>
          <Dropdown
            menu={{ items }}
            trigger={['contextMenu']}
            placement="topRight"
          >
            <button className="send-button" onClick={handleSendMessage}>
              <SendOutlined />
            </button>
          </Dropdown>
          <DelayMessageModal 
            isOpenModal={isOpenModal}
            closeModal={closeModal}
            onSubmit={onSubmit}
          />
        </>
      )}
    </>
  );
}

export default observer(SendButton);
