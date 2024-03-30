import React from 'react';
import { Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const { Header: HeaderAD } = Layout;

const Header: React.FC = () => {
  return (
    <HeaderAD>
      <Input
        placeholder="Поиск контактов"
        prefix={<SearchOutlined />}
      />
    </HeaderAD>
  );
};

export default Header;