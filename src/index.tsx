import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import "antd/dist/reset.css";
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento com id 'root' não encontrado no documento");
}