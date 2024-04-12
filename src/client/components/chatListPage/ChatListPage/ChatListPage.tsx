import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';
import { ChatList } from '../ChatList';
import './ChatListPage.css';
import { searchUsersByUsername } from '../../../../mock';
import { useDebounce } from '../../../../hooks';
import { ChatType, UserType } from '../../../../types';
import { chatsStore } from '../../../stores';


const ChatListPage: React.FC = () => {
  const { items } = chatsStore;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(new Array<ChatType>());
  const [isSearching, setIsSearcing] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearcing('proccesing');
        
        searchUsersByUsername(debouncedSearchTerm).then(results => {
          setIsSearcing('found');

          setResults(results);
          console.log(results);
        });
      } else {
        setIsSearcing('');
        setResults([]);
      }
    }, [debouncedSearchTerm]
  )
  
   

  return (
    <Layout className='main'>
        <Header value={searchTerm} setSearchTerm={setSearchTerm}/>
        <ChatList setSearchTerm={setSearchTerm} data={isSearching === '' ? items : results}/>
    </Layout>
  );
};

export default ChatListPage;
