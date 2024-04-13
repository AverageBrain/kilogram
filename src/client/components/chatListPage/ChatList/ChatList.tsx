import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import './ChatList.css'
import { UserType } from '../../../../types';
import { useDebounce } from '../../../../hooks';
import { userApiClient } from '../../../hands';
import SearchResults from './SearchResults';
import Chats from './Chats';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ChatList: React.FC<Props> = ({ setSearchTerm, searchTerm }) => {
  const [isSearching, setIsSearcing] = useState('');
  console.log(isSearching);

  const [results, setResults] = useState(new Array<UserType>());

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearcing('proccesing');
        userApiClient.findUsers(debouncedSearchTerm).then(results => {
          setIsSearcing('found');

          setResults(results);
        });
      } else {
        setIsSearcing('');
        setResults([]);
      }
    }, [debouncedSearchTerm]
  )

  return (
    isSearching ? 
      <SearchResults results={results} isSearching={isSearching} setSearchTerm={setSearchTerm} /> : 
      <Chats setSearchTerm={setSearchTerm} />
  );
};

export default observer(ChatList);
