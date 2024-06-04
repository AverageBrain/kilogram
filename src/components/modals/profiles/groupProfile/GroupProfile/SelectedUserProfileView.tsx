import React from 'react';
import { UserType } from '../../../../../types';
import { ModalHeader } from '../../../commonComponents/header';

import { UserModalMain } from '../../userProfile/UserMainModal';
import { useTypeOfScreen } from '../../../../../hooks';

type Props = {
  selectedUser: UserType;
  handleBack: () => void;
  closeModal: () => void;
};

export const SelectedUserProfileView: React.FC<Props> = ({ selectedUser, handleBack, closeModal }) => {
  const { isHiddenModal } = useTypeOfScreen();

  return (
    <>
      <ModalHeader
        handleBack={handleBack}
        handleClose={isHiddenModal ? undefined : closeModal}
        title="Информация о пользователе"
      />
      <UserModalMain closeModal={closeModal} user={selectedUser}/>
    </>
  );
};
