import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import { ChatList, Header } from './client/components';
import Auth from "./Auth";

function App() {
  return (
    <Layout>
        <Auth/>
      <Header />
    </Layout>
  );
}

export default App;
