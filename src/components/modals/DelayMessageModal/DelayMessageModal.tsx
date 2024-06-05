import React, { useState } from 'react';
import ru from 'antd/es/date-picker/locale/ru_RU';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { range } from 'lodash';
import { ModalHeader } from '../commonComponents/header';
import Modal from '../commonComponents/modal';
import { ModalFooter } from '../commonComponents/footer';

import styles from './DelayMessageModal.module.scss';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
  onSubmit: (delayDate?: Date) => void;
};

export const DelayMessageModal: React.FC<Props> = ({ isOpenModal, closeModal, onSubmit }) => {
  const [delayDate, setDelayDate] = useState(dayjs().add(10, 'minute'));
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
    const disabledMinutes = (hour: number) => (isToday && hour === now.hour() ? range(0, now.minute() + 1) : []);

    return {
      disabledHours,
      disabledMinutes,
    };
  };

  const handleSendDelayMessage = () => {
    onSubmit(delayDate.toDate());
    closeModal();
  };

  return (
    <Modal
      modalType="small"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
      <ModalHeader title="Отправить сообщение..." toggle={closeModal} />
      <DatePicker
        className={styles['date-picker']}
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
      <ModalFooter handleSave={handleSendDelayMessage} saveText="Отправить" handleBack={closeModal} />
    </Modal>
  );
};
