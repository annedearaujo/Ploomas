// Importações do React e bibliotecas externas
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Importações do Ant Design
import { notification, theme } from "antd";

// Importações de estilos globais
import "./app-style.css";
import "antd/dist/reset.css";
import AppView from "./app-view";

const App: React.FC = () => {
  // Lógica para verificar se há uma chave de usuário nos cookies
  const userKey = Cookies.get("userKey");
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
    const redirected = sessionStorage.getItem("redirected");

    if (redirected) {
      notification.success({
        message: "Redirecionado com sucesso!",
        description:
          "Você foi redirecionado para a página de autenticação. Faça login para continuar.",
      });

      // Limpar o flag de redirecionamento da sessão
      sessionStorage.removeItem("redirected");
    }
  };

  // Função para lidar com a mudança do interruptor de modo escuro
  const handleSwitchChange = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  useEffect(() => {
    if (!userKey) {
      navigate("/authentication");
    }
  }, [userKey]);

  // Renderizar o conteúdo principal do aplicativo se a chave do usuário estiver presente
  return (
    <AppView
      isDarkMode={isDarkMode}
      darkAlgorithm={darkAlgorithm}
      defaultAlgorithm={defaultAlgorithm}
      handleSwitchChange={handleSwitchChange}
    />
  );
};

export default App;
