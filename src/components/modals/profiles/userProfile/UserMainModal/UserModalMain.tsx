import React from 'react';

import { MainInfo } from '../../../commonComponents/mainInfo';
import { UserType } from '../../../../../types';
import { AdditionalInfo } from './AdditionalInfo';
import { WriteUserButton } from './WriteUserButton';
import { authUserStore } from '../../../../../stores';
import { getHandle } from '../../../../../utils';

type Props = {
  user: UserType;
  closeModal: () => void;
};

export const UserModalMain: React.FC<Props> = ({ user, closeModal }) => {
  const { selectedItem } = authUserStore;

  const isAuthUser = user === selectedItem;

  return (
    <>
      <MainInfo
        name={user.name}
        description={getHandle({ user })}
        avatarParams={{
          userId: user.id, size: 80, userStatus: user?.userStatus, availableForUpdate: isAuthUser,
        }}
      />
      <AdditionalInfo user={user} />

      {!isAuthUser && <WriteUserButton user={user} closeModal={closeModal} />}
    </>
  );
};
