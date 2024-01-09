import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AuthenticationPage: React.FC = () => {
    const [userKey, setUserKey] = useState<string>(''); // Estado para armazenar a user-key

    const handleUserKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserKey(event.target.value);
    };

    const handleSaveUserKey = () => {
        // Salvar a user-key nos cookies
        Cookies.set('user-key', userKey, { expires: 1 }); // Cookie válido por 1 dia

        // Conectar com a API do Ploomes para verificar a autenticação
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
    };

    return (
        <div>
            <h2>Autenticação</h2>
            <label>
                User Key:  
                <input type="text" value={userKey} onChange={handleUserKeyChange} />
            </label>
            <button onClick={handleSaveUserKey}>Salvar UK</button>
        </div>
    );
};

export default AuthenticationPage;