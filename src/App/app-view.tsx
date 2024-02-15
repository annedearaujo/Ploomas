// Importações do React e bibliotecas externas
import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Importações do Ant Design
import { ConfigProvider, Layout } from "antd";

// Importações locais de componentes e páginas
import AuthenticationPage from "../pages/AuthenticationPage";
import UserKeyPopup from "../components/UserKeyPopup";
import Summary from "../components/Summary";
import ClientList from "../pages/ClientList";
import ClientDetails from "../pages/ClientDetails";
import ClientEdit from "../pages/ClientEdit";
import ClientCreate from "../pages/ClientCreate";
import { UserKeyProvider } from "../contexts/UserKeyContext";
import DarkModeSwitch from "../components/DarkModeSwitch";

// Importações de estilos globais
import "./app-style.css";
import "antd/dist/reset.css";

const { Footer } = Layout;

interface IProps {
  isDarkMode: boolean;
  darkAlgorithm: any;
  defaultAlgorithm: any;
  handleSwitchChange: (checked: boolean) => void;
}

// Tipagem para definir cores do container
interface AppContainerProps {
  isDarkMode: boolean;
}

const AppContainer = styled.div<AppContainerProps>((props) => ({
  backgroundColor: props.isDarkMode ? "#333" : "#fff",
  transition: "background-color 0.3s ease",
}));

const AppViewNoMemo: React.FC<IProps> = (props) => (
  <AppContainer isDarkMode={props.isDarkMode}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6759c0",
          colorLink: "#9288DD",
        },
        algorithm: props.isDarkMode
          ? props.darkAlgorithm
          : props.defaultAlgorithm,
      }}
    >
      <UserKeyProvider>
        <div>
          {/* Rotas para páginas do cliente e authenticação */}
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/:clientId" element={<ClientDetails />} />
            <Route
              path="/clients/:clientId/edit"
              element={<ClientEdit children={undefined} />}
            />
            <Route path="/clients/create" element={<ClientCreate />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
          </Routes>

          {/* Componente de pop-up da chave do usuário */}
          <UserKeyPopup />

          {/* Interruptor para o modo escuro */}
          <DarkModeSwitch
            isDarkMode={props.isDarkMode}
            onSwitchChange={props.handleSwitchChange}
          />
        </div>
        <Footer style={{ textAlign: "center" }}>
          Anne Araújo © {new Date().getFullYear()}
        </Footer>
      </UserKeyProvider>
    </ConfigProvider>
  </AppContainer>
);

const AppView = React.memo(AppViewNoMemo);
export default AppView;
