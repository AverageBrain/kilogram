import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import {
  Dropdown, Input, Layout, MenuProps,
} from 'antd';
import { useModal } from '../../../../hooks';
import { authUserStore } from '../../../../stores';
import { UserProfile } from '../../../modals';
import { BASE_LOGOUT_HOST } from '../../../../hands/BaseApiClient';

import styles from './Header.module.scss';
import { requestPermission } from '../../../../plugins/firebase';

const { Header: HeaderAD } = Layout;

type Props = {
  // setIsSearcing: (value: string) => void;
  value: string;
  setSearchTerm: (value: string) => void;
};

const Header: React.FC<Props> = ({ value, setSearchTerm }) => {
  const { selectedItem, logOut } = authUserStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const handleLogout = async () => {
    await logOut();
    window.location.href = BASE_LOGOUT_HOST;
  };

  const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
    {
      label: 'Профиль',
      onClick: showModal,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'Выйти',
      key: '1',
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <HeaderAD className={styles.header}>
        <Dropdown menu={{ items }} trigger={['click']}>
          <MenuOutlined className={styles.icon} />
        </Dropdown>
        <Input
          allowClear
          className={styles.search}
          variant="borderless"
          placeholder="Поиск контактов..."
          value={value}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </HeaderAD>

      {selectedItem && <UserProfile user={selectedItem} isOpenModal={isOpenModal} closeModal={closeModal} />}
    </>
  );
};

export default Header;
