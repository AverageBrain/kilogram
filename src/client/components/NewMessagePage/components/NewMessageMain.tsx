import React, { useState } from 'react';

import { NewMessageUserSearch } from './NewMessageUserSearch';
import { NewMessageUsersList } from './NewMessageUsersList';

type Props = {
  closeModal: () => void;
}

export const NewMessageMain: React.FC<Props> = ({ closeModal }) => {
  const [ searchTerm, setSearchTerm ] = useState('');

  return (
    <main className="new-message-user-list">
      <NewMessageUserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <NewMessageUsersList searchTerm={searchTerm} setSearchTerm={setSearchTerm} closeModal={closeModal}/>
    </main>
  );
};
