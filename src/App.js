import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import YapiskanNotlar from './component/YapiskanNotlar';
import Nots from './component/Nots';
import './App.css';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'Nots' },

];

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 0
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
            lineHeight: '64px',
          }}
        />
      </Header>
      <Content>
        {selectedKey === '1' && <YapiskanNotlar />}
        {selectedKey === '2' && <Nots />}
  
      </Content>
      
    </Layout>
  );
};

export default App;
