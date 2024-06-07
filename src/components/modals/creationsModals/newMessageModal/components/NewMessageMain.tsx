import React, { useState } from 'react';

import NewMessageUsersList from './NewMessageUsersList';
import { UserSearch } from '../../../commonComponents/userSearch';

type Props = {
  closeModal: () => void;
};

export const NewMessageMain: React.FC<Props> = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NewMessageUsersList searchTerm={searchTerm} setSearchTerm={setSearchTerm} closeModal={closeModal} />
    </>
  );
};
