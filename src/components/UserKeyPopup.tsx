import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/UserKeyPopup.css';

const UserKeyPopup: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [userKey, setUserKey] = useState<string>(Cookies.get('user-key') || '');

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
                    <input type="text" value={userKey} onChange={(e) => setUserKey(e.target.value)} />
                    <button onClick={handleSaveClick}>Salvar</button>
                </div>
            ) : (
                <div>
                    <span>User-Key: {truncatedUserKey}... </span>
                    <button onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default UserKeyPopup;