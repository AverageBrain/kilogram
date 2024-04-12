import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input, Layout, MenuProps } from 'antd';
import React from 'react';
import {Layout, Input, Dropdown, MenuProps, Button} from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

import { useModal } from '../../../../hooks';
import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';
import { Profile } from '../../Profile';
import './Header.css';

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
    window.location.href = 'http://localhost:3000/'; // TODO change
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
            allowClear
            className="search"
            variant="borderless"
            placeholder="Поиск контактов"
            value={value}
            onChange={e => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined style={ {color: '#516460' }}/>}
          />
      </HeaderAD>

      {selectedItem && <Profile user={selectedItem} isOpenModal={isOpenModal} toggle={closeModal} />}
    </>
  );
};

export default Header;
