import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ChatDate.module.scss';

type Props = {
  date: string;
};

const ChatDate: React.FC<Props> = ({ date }) => {
  return (
    <div className={styles['chat-date']}>
      <span className={styles['date-wrapper']}>
        {date}
      </span>
    </div>
  );
};

export default observer(ChatDate);
