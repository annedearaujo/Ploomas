import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthenticationPage from './pages/AuthenticationPage';
import UserKeyPopup from './components/UserKeyPopup';
import Summary from './components/Summary';
import ClientList from './pages/ClientList';
import ClientDetails from './pages/ClientDetails';
import ClientEdit from './pages/ClientEdit';
import ClientCreate from './pages/ClientCreate';
import 'antd/dist/reset.css';
import { notification, ConfigProvider, theme, Button, Card, Switch } from 'antd';
import './styles/styles.css';
import { BulbOutlined } from '@ant-design/icons';
// import { Switch } from "antd";

const App: React.FC = () => {
  const userKey = Cookies.get('user-key');
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [darkMode, setDarkMode] = useTheme();

  useEffect(() => {
    // Verifique se houve uma notificação de redirecionamento
    const redirected = sessionStorage.getItem('redirected');

    if (redirected) {
      notification.success({
        message: 'Redirecionado com sucesso!',
        description: 'Você foi redirecionado para a página de autenticação. Faça login para continuar.',
      });

      // Limpe o flag de redirecionamento da sessão
      sessionStorage.removeItem('redirected');
    }
  }, []);

  // const handleClick = () => {
  //   setIsDarkMode((previousValue) => !previousValue);
  // };

  const handleSwitchChange = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  // Renderize a tela de autenticação se a user-key não estiver presente nos cookies
  if (!userKey) {
    return (
      <>
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />
          <Route path="*" element={<Navigate to="/authentication" />} />
        </Routes>
      </>
    );
  }

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <>
        <Router>
          <div>
            <Summary />
            <Routes>
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clients/:clientId" element={<ClientDetails />} />
              <Route path="/clients/:clientId/edit" element={<ClientEdit children={undefined} />} />
              <Route path="/clients/create" element={<ClientCreate />} />
            </Routes>
            <UserKeyPopup />
            {/* <Button onClick={handleClick}>
              Change Theme to {isDarkMode ? "Light" : "Dark"}
            </Button> */}
            <Switch
              checked={isDarkMode}
              onChange={handleSwitchChange}
              checkedChildren={<BulbOutlined style={{ color: '#000' }} />}
              unCheckedChildren={<BulbOutlined style={{ color: '#f3ea62' }} />} 
              style={{ 
                position: 'absolute',
                top: 10,  // Ajustar
                left: 10, // Ajustar
                backgroundColor: isDarkMode ? '#333' : '#f0f0f0', border: isDarkMode ? '1px solid #fff' : '1px solid #d9d9d9' }}
              />
          </div>
        </Router>
      </>
    </ConfigProvider>
  );
};

export default App;