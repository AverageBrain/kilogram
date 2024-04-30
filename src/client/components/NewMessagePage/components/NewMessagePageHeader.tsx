import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

export const NewMessagePageHeader: React.FC<Props> = ({ closeModal }) => {

  return (
    <header>
      <div className='header-name'>Новое сообщение</div>
      <div className='icon' onClick={closeModal}><CloseOutlined /></div>
    </header>
  );
};
