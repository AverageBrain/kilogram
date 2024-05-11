import React, { useState } from 'react';

import { NewMessageUsersList } from './NewMessageUsersList';
import { UserSearch } from '../../../commonComponents/userSearch';

type Props = {
  closeModal: () => void;
}

export const NewMessageMain: React.FC<Props> = ({ closeModal }) => {
  const [ searchTerm, setSearchTerm ] = useState('');

  return (
    <main className="new-message-user-list">
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <NewMessageUsersList searchTerm={searchTerm} setSearchTerm={setSearchTerm} closeModal={closeModal}/>
    </main>
  );
};
