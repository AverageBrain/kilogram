import React from 'react';
import ReactDOM from 'react-dom/client';

import { authApiClient } from './hands';
import App from './App';
import './index.css';

const pathname = '/api/auth/github/callback';
if (window.location.pathname === pathname) {
  const url = window.location.href.replace(`${window.location.origin}/api`, '');
  authApiClient.authGithubCallback(url).then(() => {
    window.location.href = '/';
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);
