import React from 'react';
import Modal from 'react-modal';
import MembersList from '../MembersList';
import { Button } from 'antd';
import { ChatType } from '../../../../../../types';
import { copyToClipboard, getCorrectMemberCase } from '../../../../../utils';
import { authUserStore } from '../../../../../stores';
import { ModalHeader } from '../../../commonComponents/header';
import { MainInfo } from '../../../commonComponents/mainInfo';
import { Divider } from '../../../commonComponents/divider';

import './GroupProfile.css';

type Props = {
  group: ChatType;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const GroupProfile: React.FC<Props> = ({ group, isOpenModal, closeModal }) => {
  const { selectedItem } = authUserStore;

  const membersCount = group.users.length + 1;

  const handleClick = () => {
    const { origin } = document.location;
    copyToClipboard(`${origin}/join/${group.joinKey}`);
  };

  return (
    <Modal 
      className="modal"
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      closeTimeoutMS={500}>
        <ModalHeader toggle={closeModal} title='Информация о группе' />
        <MainInfo 
            name={group.name}
            description={`${membersCount} ${getCorrectMemberCase(membersCount)}`}
            avatarParams={{size: 80}}
          />
        <Button
          className="invite-button"
          type="text"
          size="large"
          onClick={handleClick}
        >
          Скопировать приглашение
        </Button>
        <Divider />
        {selectedItem && (<MembersList users={[selectedItem, ...group.users]} />)}
    </Modal>
  );
}

