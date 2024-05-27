import React, { useState } from 'react';
import Modal from '../../../commonComponents/modal';

import { ChatType, UserType } from '../../../../../types';

import { SelectedUserProfileView } from './SelectedUserProfileView';
import { GroupProfileView } from './GroupProfileView';

type Props = {
  group: ChatType;
  isOpenModal: boolean;
  closeModal: () => void;
};

export const GroupProfile: React.FC<Props> = ({ group, isOpenModal, closeModal }) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <Modal
      modalType="big"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
      onAfterClose={() => setSelectedUser(null)}
    >
        {selectedUser
          ? <SelectedUserProfileView selectedUser={selectedUser} handleBack={handleBack} closeModal={closeModal}/>
          : <GroupProfileView group={group} closeModal={closeModal} setSelectedUser={setSelectedUser}/>}

    </Modal>
  );
};
