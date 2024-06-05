import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import InfiniteScroll from '../InfiniteScroll';
import { messagesStore } from '../../../../stores';

import styles from './ChatPage.module.scss';
import buttonsStyles from '../../../../styles/buttons.module.scss';

const { Header } = Layout;

const ChatPage: React.FC = () => {
  const { resetItems } = messagesStore;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [shouldLoadDelayed, setShouldLoadDelayed] = useState(false);

  useEffect(() => () => {
    resetItems();
  }, []);

  const handleClickBack = () => {
    resetItems();
    setShouldLoadDelayed(false);
  };

  return (
    <div className={styles.chat}>
      {shouldLoadDelayed
        ? (
          <Header className={styles['delay-chat-header']}>
            <button type="button" aria-label="Back" className={buttonsStyles['icon-svg-button']} onClick={handleClickBack}>
              <ArrowLeftOutlined style={{ fontSize: '18px' }} />
            </button>
            <div className={styles.title}>
              Отложенные сообщения
            </div>
          </Header>
        ) : <ChatHeader />}
      <InfiniteScroll key={shouldLoadDelayed.toString()} scrollRef={scrollRef} shouldLoadDelayed={shouldLoadDelayed} />
      {!shouldLoadDelayed && <SendForm scrollRef={scrollRef} setShouldLoadDelayed={setShouldLoadDelayed} />}
    </div>
  );
};

export default observer(ChatPage);
