import React from 'react';
import { ArrowLeftOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';
import './ModalHeader.css';

type Props = {
  title: string;
  toggle: () => void;
  handleBack?: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title, toggle, handleBack }) => {
  return (
    <header>
      {handleBack && <div className='icon back-button' onClick={handleBack}><ArrowLeftOutlined /></div>}
      <div className='header-name'>{title}</div>
      <div className='icon close-button' onClick={toggle}><CloseOutlined /></div>
    </header>
  );
}
