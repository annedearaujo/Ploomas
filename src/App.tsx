import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthenticationPage from './pages/AuthenticationPage';
import UserKeyPopup from './components/UserKeyPopup';
import Summary from './components/Summary';
import ClientList from './pages/ClientList';
import ClientDetails from './pages/ClientDetails';
import ClientEdit from './pages/ClientEdit';
import ClientCreate from './pages/ClientCreate';
import ClientSearch from './components/ClientSearch';

const App: React.FC = () => {
  const userKey = Cookies.get('user-key');

  // Renderize a tela de autenticação se a user-key não estiver presente nos cookies
  if (!userKey) {
    return <Navigate to="/authentication" />;
  }

  return (
    <Router>
      <div>
        <Summary />
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />
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