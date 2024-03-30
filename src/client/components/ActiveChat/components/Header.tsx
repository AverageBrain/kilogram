import { FC } from 'react';
import { Layout } from 'antd';
import { ChatType } from '../../../../types'

interface Props {
  chat: ChatType;
}

const { Header: HeaderAD } = Layout;

export const Header: FC<Props> = ({ chat }) => {

  return (
    <HeaderAD>
      <div className="user-name">{chat.user.name}</div>
     </HeaderAD>
  );
};
