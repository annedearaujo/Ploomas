import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Input } from 'antd';
import '../styles/UserKeyPopup.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    // Adicionar mais estilos conforme necessário
  }
`;

const UserKeyPopup: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [userKey, setUserKey] = useState<string>(Cookies.get('user-key') || '');
    /* const { userKey, login, logout } = useAuth(); // usar se necessário */

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        // Lógica para salvar a user-key nos cookies
        Cookies.set('user-key', userKey, { expires: 1 }); // Cookie válido por 1 dia
        setEditing(false);
    };

    // Extraindo os primeiros 5 caracteres para exibição
    const truncatedUserKey = userKey.substring(0, 5);

    return (
        <div className={`user-key-popup ${editing ? 'editing' : ''}`}>
            {editing ? (
                <div>
                    <Input value={userKey} onChange={(e) => setUserKey(e.target.value)} />
                    <Button type="primary" onClick={handleSaveClick}>Salvar</Button>
                </div>
            ) : (
                <div>
                    <span>User-Key: {truncatedUserKey}... </span>
                    <Button onClick={handleEditClick}>Editar</Button>
                </div>
            )}
            <GlobalStyle />
        </div>
    );
};

export default UserKeyPopup;