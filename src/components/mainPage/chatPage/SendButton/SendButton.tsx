import React from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Dropdown, MenuProps } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useModal } from '../../../../hooks';
import { messagesStore } from '../../../../stores';
import { DelayMessageModal } from '../../../modals';

import buttonsStyles from '../../../../styles/buttons.module.scss';

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
        ? <Spin className={buttonsStyles['big-icon-svg-button']} />
        : (
          <>
            <Dropdown
              menu={{ items }}
              trigger={['contextMenu']}
              placement="topRight"
            >
              <button type="submit" aria-label="Send" className={buttonsStyles['big-icon-svg-button']} onClick={handleSendMessage}>
                <SendOutlined />
              </button>
            </Dropdown>

          </>
        )}
      <DelayMessageModal isOpenModal={isOpenModal} closeModal={closeModal} onSubmit={onSubmit} />
    </>
  );
};

export default observer(SendButton);
