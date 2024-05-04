import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthRoutes from '../AuthRoutes';
import LogInPage from '../../LogInPage';
import MainPage from '../../MainPage';
import JoinGroupPage from '../../JoinGroupPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<AuthRoutes><MainPage /></AuthRoutes>}
        />
        <Route
          path="/join/:joinKey"
          element={<AuthRoutes><JoinGroupPage /></AuthRoutes>}
        />
        <Route
          path="/login"
          element={<LogInPage />}
        />
        <Route
          path="*"
          element={<div>404</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
