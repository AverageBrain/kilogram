import React from 'react';
import MembersList from '../MembersList';
import { Button } from 'antd';
import { ChatType, UserType } from '../../../../../types';
import { copyToClipboard, getCorrectMemberCase } from '../../../../../utils';
import { authUserStore } from '../../../../../stores';
import { ModalHeader } from '../../../commonComponents/header';
import { MainInfo } from '../../../commonComponents/mainInfo';
import { Divider } from '../../../commonComponents/divider';

import styles from './GroupProfile.module.scss';

type Props = {
  group: ChatType;
  closeModal: () => void;
  setSelectedUser: (user: UserType) => void;
};

export const GroupProfileView: React.FC<Props> = ({ group, closeModal, setSelectedUser }) => {
  const { selectedItem } = authUserStore;
  const membersCount = group.users.length + 1;

  const handleClick = () => {
    const { origin } = document.location;
    copyToClipboard(`${origin}/join/${group.joinKey}`);
  };

  const handleClickOnUser = (user: UserType) => {
    setSelectedUser(user);
  };

  return (
    <>
      <ModalHeader toggle={closeModal} title="Информация о группе" />
      <MainInfo
          name={group.name}
          description={`${membersCount} ${getCorrectMemberCase(membersCount)}`}
          avatarParams={{ size: 80 }}
        />
      <Button
        className={styles['invite-button']}
        type="text"
        size="large"
        onClick={handleClick}
      >
        Скопировать приглашение
      </Button>
      <Divider />
      {selectedItem && (<MembersList users={[selectedItem, ...group.users]} handleClickOnUser={handleClickOnUser} />)}
    </>
  );
};
