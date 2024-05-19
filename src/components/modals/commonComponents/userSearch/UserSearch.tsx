import React from 'react';

import { Input } from 'antd';
import styles from './UserSearch.module.scss';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void; 
};

export const UserSearch: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className={styles["search-bar"]}>
      <Input
        allowClear={true}
        className={styles["search"]}
        variant="borderless"
        placeholder="Поиск контактов..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
