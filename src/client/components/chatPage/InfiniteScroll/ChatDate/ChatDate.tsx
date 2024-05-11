import React from 'react';
import { observer } from 'mobx-react-lite';
import './ChatDate.css';

type Props = {
  date: string;
};

const ChatDate: React.FC<Props> = ({ date }) => {
  return (
    <div className='chat-date'>
      <span className='date-wrapper'>
        {date}
      </span>
    </div>
  );
};

export default observer(ChatDate);
