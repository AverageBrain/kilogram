import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  title: string;
  toggle: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title, toggle }) => {
  return (
    <header>
      <div className='header-name'>{title}</div>
      <div className='icon' onClick={toggle}><CloseOutlined /></div>
    </header>
  );
}
