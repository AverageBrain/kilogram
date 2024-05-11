import React from 'react';
import Modal from 'react-modal';
import { Avatar, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { ChatType } from '../../../../types';
import { copyToClipboard, getCorrectMemberCase } from '../../../utils';
import { authUserStore } from '../../../stores';
import MembersList from '../MembersList';
import './GroupProfile.css';

type Props = {
  group: ChatType;
  isOpenModal: boolean;
  closeModal: () => void;
}

// TODO: вынести общую модалку с хедером и дивайдерами
const GroupProfile: React.FC<Props> = ({ group, isOpenModal, closeModal }) => {
  const { selectedItem } = authUserStore;

  const membersCount = group.users.length + 1;
  
  const handleClick = () => {
    const { origin } = document.location;
    copyToClipboard(`${origin}/join/${group.joinKey}`);
  };

  return (
    <Modal 
      className="group-profile-modal"
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      closeTimeoutMS={500}>
        <header>
          <div className="header-name">Информация о группе</div>
          <div className="icon" onClick={closeModal}><CloseOutlined /></div>
        </header>
        <div className="main-info">
          <div className="avatar">
            <Avatar />
          </div>
          <div className='text-info'>
            <span className='name'>{group.name}</span>
            <span className='last-seen'>
              {`${membersCount} ${getCorrectMemberCase(membersCount)}`}
            </span>
          </div>
        </div>
        <Button
          className="invite-button"
          type="text"
          size="large"
          onClick={handleClick}
        >
          Скопировать приглашение
        </Button>
        {selectedItem && (<MembersList users={[selectedItem, ...group.users]} />)}
    </Modal>
  );
}

export default GroupProfile;
