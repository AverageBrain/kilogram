import React, { PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import { Navigate } from 'react-router-dom';
import { authUserStore } from '../../../stores';

type Props = PropsWithChildren;

const AuthRoutes: React.FC<Props> = ({ children }) => {
  const { loggedIn } = authUserStore;

  return (
    <>
      {loggedIn
        ? children
        : <Navigate replace to="/login" />}
    </>
  );
};

export default observer(AuthRoutes);
