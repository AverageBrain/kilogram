import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input, Layout, MenuProps, Space } from 'antd';
import React from 'react';

import { useModal } from '../../../../hooks';
import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';
import { UserProfile } from '../../modals/profiles/userProfile/UserProfile';
import './Header.css';
import {BASE_LOGOUT_HOST} from "../../../hands/BaseApiClient";

const { Header: HeaderAD } = Layout;

type Props = {
  // setIsSearcing: (value: string) => void;
  value: string,
  setSearchTerm: (value: string) => void;
}

const Header: React.FC<Props> = ({ value, setSearchTerm, }) => {
  const { selectedItem } = authUserStore;

  const { isOpenModal, showModal, closeModal } = useModal();

  const handleLogout = async () => {
    await authApiClient.logout();
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
      <HeaderAD className="header">
          <Dropdown menu={{ items }} trigger={['click']}>
            <MenuOutlined className="icon" />
          </Dropdown>
          <Input
            allowClear={true}
            className="search"
            variant="borderless"
            placeholder="Поиск контактов..."
            value={value}
            onChange={e => setSearchTerm(e.target.value)}
          />
      </HeaderAD>

      {selectedItem && <UserProfile user={selectedItem} isOpenModal={isOpenModal} closeModal={closeModal} />}
    </>
  );
};

export default Header;
