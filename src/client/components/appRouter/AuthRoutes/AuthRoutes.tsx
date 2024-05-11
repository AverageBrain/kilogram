import React, { PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'lodash';

import { authUserStore } from '../../../stores';
import { Navigate } from 'react-router-dom';

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
