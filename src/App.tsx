import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthenticationPage from './pages/AuthenticationPage';
import UserKeyPopup from './components/UserKeyPopup';
import Summary from './components/Summary';

const App: React.FC = () => {
  useEffect(() => {
    const userKey = Cookies.get('user-key');

    if (userKey) {
      // Realizar a autenticação novamente usando a user-key
      fetch('https://public-api2.ploomes.com/Self/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Key': userKey,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao autenticar usuário');
          }
          // Lógica adicional aqui se a autenticação for bem-sucedida
        })
        .catch(error => {
          console.error('Erro ao conectar com a API do Ploomes:', error);
          // Lógica de tratamento de erro aqui
        });
    }
  }, []);

  return (
    <Router>
      < div>
        <Summary />
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />
        </Routes>
        <UserKeyPopup />
      </div>
    </Router>
  );
};

export default App;