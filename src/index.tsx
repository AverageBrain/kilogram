import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { authApiClient } from './client/hands';


const pathname = '/api/auth/github/callback'
if (window.location.pathname === pathname) {
    const url = window.location.href.replace(window.location.origin + '/api', '')
    authApiClient.authGithubCallback(url).then(() => {
            window.location.href = '/'
        }
    )
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <App/>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
