import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { chatsStore, messagesStore } from '../../../stores';
import { Message } from '../Message';
import './InfiniteScroll.css';
import { Spin } from 'antd';
import { TypeOfChat } from '../../../../types';

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
  shouldLoadDelayed?: boolean;
};

const InfiniteScroll: React.FC<Props> = ({ scrollRef, shouldLoadDelayed }) => {
  const { items, loadMessages, loadDelayedMessages, loading } = messagesStore;
  const { selectedItem: chat } = chatsStore;

  const [hasMore, setHasMore] = useState(true);
  const target = useRef<HTMLDivElement>(null);  
  
  const handleObserver = useCallback(async (entries: IntersectionObserverEntry[]) => {
    if (hasMore && !loading && chat && entries[0].isIntersecting) {
      const loadMore = shouldLoadDelayed
       ? await loadDelayedMessages(chat?.id, items[items.length - 1]?.inTime, true)
       : await loadMessages(chat?.id, items[items.length - 1]?.id, true);
      setHasMore(loadMore);
    }
  }, [items, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleObserver,
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target, handleObserver]);

    return (
      <div ref={scrollRef} className="messages">
        {items.map((curMessage) => (
          <Message
            key={curMessage.id}
            message={curMessage}
            isGroup={chat?.type === TypeOfChat.Group}
          />
        ))}
        <div className='loading-bar' ref={target}>
          {loading && 
            <div className='loading'>
              <Spin />
            </div>
          }
        </div>
      </div>
    );
};

export default observer(InfiniteScroll);
