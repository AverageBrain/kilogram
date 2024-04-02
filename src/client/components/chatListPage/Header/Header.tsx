import React from 'react';
import { Layout, Input, Dropdown, MenuProps } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

import './Header.css';
import { useModal } from '../../../../hooks/useModal';
import { Profile } from '../../Profile';
import { UserType } from '../../../../types';

const { Header: HeaderAD } = Layout;

type Props = {
  activeUser: UserType;
}

const Header: React.FC<Props> = ({ activeUser }) => {
  const { isOpenModal, showModal, closeModal } = useModal();

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
    },
  ];
  
  return (
    <>
      <HeaderAD className="header">
          <Dropdown menu={{ items }} trigger={['click']}> 
            <MenuOutlined className="icon" />
          </Dropdown>
          <Input
            placeholder="Поиск контактов"
            prefix={<SearchOutlined style={ {color: '#516460' }}/>}
          />
      </HeaderAD>

      <Profile user={activeUser} isOpenModal={isOpenModal} toggle={closeModal} />
    </>
  );
};

export default Header;
