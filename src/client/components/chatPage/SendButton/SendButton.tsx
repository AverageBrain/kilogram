import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Dropdown, MenuProps, DatePicker, Button, Flex } from 'antd';
import ru from 'antd/es/date-picker/locale/ru_RU';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import { range } from 'lodash';

import { useModal } from '../../../../hooks';
import { messagesStore } from '../../../stores';
import './SendButton.css';

type Props = {
  disabledDelay: boolean;
  onSubmit: (delayDate?: Date) => void;
};

const SendButton: React.FC<Props> = ({ disabledDelay, onSubmit }) => {
  const { loading } = messagesStore;

  const [delayDate, setDelayDate] = useState(dayjs().add(10, 'minute'));
  const { isOpenModal, showModal, closeModal } = useModal();

  const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
    {
      label: 'Отложенное сообщение',
      onClick: showModal,
      key: '0',
      disabled: disabledDelay,
    },
  ];

  const locale: typeof ru = {
    ...ru,
    lang: {
      ...ru.lang,
      fieldDateTimeFormat: 'DD.MM.YYYY HH:mm',
    },
  };

  const getDisabledTime = (current: dayjs.Dayjs) => {
    const now = dayjs();
    const isToday = current.format('DD.MM.YYYY') === now.format('DD.MM.YYYY');
    const disabledHours = isToday
      ? () => range(0, now.hour())
      : undefined;
    const disabledMinutes = (hour: number) => isToday && hour === now.hour() ? range(0, now.minute() + 1) : []; 
    return {
      disabledHours,
      disabledMinutes,
    };
  };

  const handleSendMessage = () => onSubmit();
  const handleSendDelayMessage = () => {
    onSubmit(delayDate.toDate());
    closeModal();
  };

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
          {isOpenModal && (
            // TODO: общая модалка
            <Modal 
              isOpen
              className="delay-modal"
              onRequestClose={closeModal}
              closeTimeoutMS={500}
            >
              <Flex vertical gap={8}>
                <header>
                  <div className='header-name'>Отправить сообщение...</div>
                  <div className='icon' onClick={closeModal}><CloseOutlined /></div>
                </header>
                <DatePicker
                  showTime
                  needConfirm
                  showNow={false}
                  value={delayDate}
                  size="large"
                  variant="borderless"
                  placeholder="Выберите дату и время"
                  locale={locale}
                  minDate={dayjs()}
                  disabledTime={getDisabledTime}
                  onChange={setDelayDate}
                />
                <footer>
                  <Button className="modal-button" type="text" size="large" onClick={closeModal}>
                    Отменить
                  </Button>
                  <Button className="modal-button" type="text" size="large" onClick={handleSendDelayMessage}>
                    Отправить
                  </Button>
                </footer>
              </Flex>
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default observer(SendButton);
