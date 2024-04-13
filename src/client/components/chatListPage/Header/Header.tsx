import React from 'react';
import {Layout, Input, Dropdown, MenuProps, Button} from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

import './Header.css';
import { useModal } from '../../../../hooks/useModal';
import { Profile } from '../../Profile';
import { authApiClient } from '../../../hands';
import { authUserStore } from '../../../stores';

const { Header: HeaderAD } = Layout;


const Header: React.FC = () => {
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
            prefix={<SearchOutlined style={ {color: '#516460' }}/>}
          />
      </HeaderAD>

      {selectedItem && <Profile user={selectedItem} isOpenModal={isOpenModal} toggle={closeModal} />}
    </>
  );
};

export default Header;
