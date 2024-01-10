import React, { useEffect } from 'react';
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
import { notification } from 'antd';

const App: React.FC = () => {
  const userKey = Cookies.get('user-key');

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

  // Renderize a tela de autenticação se a user-key não estiver presente nos cookies
  if (!userKey) {
    return (
      <Router>
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />
          <Route path="*" element={<Navigate to="/authentication" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Summary />
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/:clientId" element={<ClientDetails />} />
          <Route path="/clients/:clientId/edit" element={<ClientEdit />} />
          <Route path="/clients/create" element={<ClientCreate />} />
        </Routes>
        <UserKeyPopup />
      </div>
    </Router>
  );
};

export default App;