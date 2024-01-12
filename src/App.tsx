// Importações do React e bibliotecas externas
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Importações do Ant Design
import { notification, ConfigProvider, theme, Switch } from 'antd';
import { BulbFilled } from '@ant-design/icons';

// Importações locais de componentes e páginas
import AuthenticationPage from './pages/AuthenticationPage';
import UserKeyPopup from './components/UserKeyPopup';
import Summary from './components/Summary';
import ClientList from './pages/ClientList';
import ClientDetails from './pages/ClientDetails';
import ClientEdit from './pages/ClientEdit';
import ClientCreate from './pages/ClientCreate';

// Importações de estilos globais
import './styles/styles.css';
import 'antd/dist/reset.css';
import './theme.less';

const App: React.FC = () => {
  // Lógica para verificar se há uma chave de usuário nos cookies
  const userKey = Cookies.get('user-key');
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);


  
  // Efeito para exibir notificação de redirecionamento
  useEffect(() => {
    handleRedirectionNotification();
  }, []);

  // Função para exibir notificação de redirecionamento
  const handleRedirectionNotification = () => {
    const redirected = sessionStorage.getItem('redirected');

    if (redirected) {
      notification.success({
        message: 'Redirecionado com sucesso!',
        description: 'Você foi redirecionado para a página de autenticação. Faça login para continuar.',
      });

      // Limpar o flag de redirecionamento da sessão
      sessionStorage.removeItem('redirected');
    }
  };

  // Função para lidar com a mudança do interruptor de modo escuro
  const handleSwitchChange = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  // Renderizar a tela de autenticação se a chave do usuário não estiver presente nos cookies
  const renderAuthenticationPage = () => (
    <Router>
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="*" element={<Navigate to="/authentication" />} />
      </Routes>
    </Router>
  );

  // Renderizar o conteúdo principal do aplicativo se a chave do usuário estiver presente
  const renderAppContent = () => (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <Router>
        <div>
          {/* Componente de resumo */}
          <Summary />

          {/* Rotas para páginas do cliente */}
          <Routes>
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/:clientId" element={<ClientDetails />} />
            <Route path="/clients/:clientId/edit" element={<ClientEdit children={undefined} />} />
            <Route path="/clients/create" element={<ClientCreate />} />
          </Routes>

          {/* Componente de pop-up da chave do usuário */}
          <UserKeyPopup />
          

          {/* Interruptor para o modo escuro */}
          <Switch
            checked={isDarkMode}
            onChange={handleSwitchChange}
            checkedChildren={<BulbFilled style={{ color: '#000' }} />}
            unCheckedChildren={<BulbFilled style={{ color: '#f3ea62' }} />}
            style={{
              position: 'absolute',
              top: 10, // Ajustar
              left: 10, // Ajustar
              backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
              border: isDarkMode ? '1px solid #fff' : '1px solid #d9d9d9',
            }}
          />
        </div>
      </Router>
    </ConfigProvider>
  );

  // Retornar a tela de autenticação ou o conteúdo principal com base na presença da chave do usuário
  return !userKey ? renderAuthenticationPage() : renderAppContent();
};

export default App;