// Importações do React e bibliotecas externas
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

// Importações do Ant Design
import { notification, ConfigProvider, theme, Layout } from 'antd';

// Importações locais de componentes e páginas
import AuthenticationPage from './pages/AuthenticationPage';
import UserKeyPopup from './components/UserKeyPopup';
import Summary from './components/Summary';
import ClientList from './pages/ClientList';
import ClientDetails from './pages/ClientDetails';
import ClientEdit from './pages/ClientEdit';
import ClientCreate from './pages/ClientCreate';
import { UserKeyProvider } from './contexts/UserKeyContext';
import DarkModeSwitch from './components/DarkModeSwitch';

// Importações de estilos globais
import './styles/styles.css';
import 'antd/dist/reset.css';

const { Footer } = Layout;

// Tipagem para definir cores do container
interface AppContainerProps {
  isDarkMode: boolean;
}

// Estilizar cores do container
const AppContainer = styled.div<AppContainerProps>((props) => ({
  backgroundColor: props.isDarkMode ? '#333' : '#fff',
  transition: 'background-color 0.3s ease',
}));

const App: React.FC = () => {
  // Lógica para verificar se há uma chave de usuário nos cookies
  const userKey = Cookies.get('userKey');
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Estado para armazenar o status da autenticação
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!userKey) {
      navigate('/authentication');
    }
  }, [userKey]);

  // Renderizar o conteúdo principal do aplicativo se a chave do usuário estiver presente
  return (
    <AppContainer isDarkMode={isDarkMode}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#6759c0',
          colorLink: '#9288DD' ,
        },
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
        <UserKeyProvider>
          <div>

            {/* Rotas para páginas do cliente e authenticação */}
            <Routes>
              <Route path="/" element={<Summary />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clients/:clientId" element={<ClientDetails />} />
              <Route path="/clients/:clientId/edit" element={<ClientEdit children={undefined} />} />
              <Route path="/clients/create" element={<ClientCreate />} />
              <Route path="/authentication" element={<AuthenticationPage />} />
            </Routes>

            {/* Componente de pop-up da chave do usuário */}
            <UserKeyPopup />

            {/* Interruptor para o modo escuro */}
            <DarkModeSwitch
              isDarkMode={isDarkMode}
              onSwitchChange={handleSwitchChange}
            />
          </div>
          <Footer style={{ textAlign: 'center' }}>
            Anne Araújo © {new Date().getFullYear()}
          </Footer>
        </UserKeyProvider>
      </ConfigProvider>
    </AppContainer>
  );
};

export default App;