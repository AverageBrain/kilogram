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
import { UserModalMain } from '../../userProfile/UserMainModal';

type Props = {
  selectedUser: UserType;
  handleBack: () => void;
  closeModal: () => void;
}

export const SelectedUserProfileView: React.FC<Props> = ({ selectedUser, handleBack, closeModal }) => {
  return (
    <React.Fragment>
      <ModalHeader handleBack={handleBack} toggle={closeModal} title='Информация о пользователе' />
      <UserModalMain user={selectedUser}/>
    </React.Fragment>
  );
}

