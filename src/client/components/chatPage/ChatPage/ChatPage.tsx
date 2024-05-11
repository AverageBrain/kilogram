import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from 'antd';

import { SendForm } from '../SendForm';
import { ChatHeader } from '../ChatHeader';
import InfiniteScroll from '../InfiniteScroll';
import { messagesStore } from '../../../stores';
import './ChatPage.css'
import { ArrowLeftOutlined } from '@ant-design/icons';

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
    <div className="chat">
      {shouldLoadDelayed
        ? (
        <Header className='delay-chat-header'>
          <button className="send-button" onClick={handleClickBack}>
            <ArrowLeftOutlined style={{ fontSize: '18px'}} />
          </button>
          <div className='user-info'>
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
