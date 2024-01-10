import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Input } from 'antd';

const AuthenticationPage: React.FC = () => {
    const [userKey, setUserKey] = useState<string>(''); // Estado para armazenar a user-key
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const storedUserKey = Cookies.get('user-key');
            if (storedUserKey) {
                setUserKey(storedUserKey);

                try {
                    // Verifique a autenticação usando a user-key
                    const response = await fetch('https://public-api2.ploomes.com/Self/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Key': storedUserKey,
                        },
                    });

                    if (response.ok) {
                        // Se a autenticação for bem-sucedida, pode redirecionar ou realizar outras ações necessárias
                        // ...

                        // Atualize o estado de carregamento para indicar que a verificação foi concluída
                        setLoading(false);
                    } else {
                        // Se a autenticação falhar, mantenha a tela de autenticação
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Erro ao conectar com a API do Ploomes:', error);
                    // Lógica de tratamento de erro aqui
                    setLoading(false);
                }
            } else {
                // Se não houver user-key nos cookies, indicar que a verificação foi concluída
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    const handleUserKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserKey(event.target.value);
    };

    const handleSaveUserKey = () => {
        // Salvar a user-key nos cookies
        Cookies.set('user-key', userKey, { expires: 1 }); // Cookie válido por 1 dia

        // Redirecione ou realize outras ações necessárias
        // ...

        // Indique que a verificação foi concluída
        setLoading(false);
    };

    // Renderize a tela de carregamento enquanto a autenticação estiver sendo verificada
    if (loading) {
        return <div>Verificando autenticação...</div>;
    }

    // Renderize a tela de autenticação normalmente
    return (
        <div>
            <h2>Autenticação</h2>
            <label>
                User Key:
                <Input value={userKey} onChange={handleUserKeyChange} />
            </label>
            <Button onClick={handleSaveUserKey}>Salvar UK</Button>
        </div>
    );
};

export default AuthenticationPage;