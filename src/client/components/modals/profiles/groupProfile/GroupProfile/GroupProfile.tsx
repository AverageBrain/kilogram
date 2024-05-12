import React, { useState } from 'react';
import Modal from 'react-modal';
import MembersList from '../MembersList';
import { Button } from 'antd';
import { ChatType, UserType } from '../../../../../../types';
import { copyToClipboard, getCorrectMemberCase } from '../../../../../utils';
import { authUserStore } from '../../../../../stores';
import { ModalHeader } from '../../../commonComponents/header';
import { MainInfo } from '../../../commonComponents/mainInfo';
import { Divider } from '../../../commonComponents/divider';

import './GroupProfile.css';
import { SelectedUserProfileView } from './SelectedUserProfileView';
import { GroupProfileView } from './GroupProfileView';

type Props = {
  group: ChatType;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const GroupProfile: React.FC<Props> = ({ group, isOpenModal, closeModal }) => {
  const [ selectedUser, setSelectedUser ] = useState<UserType | null>(null);

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <Modal 
      className="big-modal"
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      onAfterClose={() => setSelectedUser(null)}
      closeTimeoutMS={500}>
        {selectedUser 
          ? <SelectedUserProfileView selectedUser={selectedUser} handleBack={handleBack} closeModal={closeModal}/>
          : <GroupProfileView group={group} closeModal={closeModal} setSelectedUser={setSelectedUser}/>}

    </Modal>
  );
}

