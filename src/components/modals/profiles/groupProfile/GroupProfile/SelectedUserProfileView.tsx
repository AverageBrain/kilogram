import React from 'react';
import { UserType } from '../../../../../types';
import { ModalHeader } from '../../../commonComponents/header';

import { UserModalMain } from '../../userProfile/UserMainModal';

type Props = {
  selectedUser: UserType;
  handleBack: () => void;
  closeModal: () => void;
};

export const SelectedUserProfileView: React.FC<Props> = ({ selectedUser, handleBack, closeModal }) => (
    <>
      <ModalHeader handleBack={handleBack} toggle={closeModal} title="Информация о пользователе" />
      <UserModalMain closeModal={closeModal} user={selectedUser}/>
    </>
);
