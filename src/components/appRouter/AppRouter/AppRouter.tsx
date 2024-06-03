import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthRoutes from '../AuthRoutes';
import LogInPage from '../../additionalPages/LogInPage';
import MainPage from '../../mainPage/MainPage';
import JoinGroupPage from '../../additionalPages/JoinGroupPage';
import NotFoundPage from '../../additionalPages/NotFoundPage';
import ErrorBoundary from '../../ErrorBoundary';

const AppRouter: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route
          index
        element={(
          <ErrorBoundary>
            <AuthRoutes>
              <MainPage />
            </AuthRoutes>
          </ErrorBoundary>
        )}
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
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
);

export default AppRouter;
