import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useDebounce } from '../../../../hooks';
import SearchResults from './SearchResults';
import Chats from './Chats';
import { userStore } from '../../../../stores';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const ChatList: React.FC<Props> = ({ setSearchTerm, searchTerm }) => {
  const { loadItems } = userStore;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      loadItems(debouncedSearchTerm);
    }
  }, [loadItems, debouncedSearchTerm]);

  return (
    debouncedSearchTerm
      ? <SearchResults setSearchTerm={setSearchTerm} />
      : <Chats setSearchTerm={setSearchTerm} />
  );
};

export default observer(ChatList);
