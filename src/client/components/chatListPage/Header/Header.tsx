import React from 'react';
import { Layout, Input, Dropdown, MenuProps } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

import './Header.css';

const { Header: HeaderAD } = Layout;

const items: MenuProps['items'] = [ // TODO: вместе с логикой вынести в отдельный компонент
  {
    label: 'Профиль',
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


const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
