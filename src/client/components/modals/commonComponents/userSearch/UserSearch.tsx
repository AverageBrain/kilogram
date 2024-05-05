import React from 'react';

import { Input } from 'antd';
import './UserSearch.css'

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void; 
};

export const UserSearch: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="search-bar">
      <Input
        allowClear={true}
        className="search"
        variant="borderless"
        placeholder="Поиск контактов..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
