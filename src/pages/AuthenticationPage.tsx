import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Input, message, Card } from 'antd';
import '../styles/styles.css';
import UserKeyPopup from '../components/UserKeyPopup';

const { Meta } = Card;

const AuthenticationPage: React.FC = () => {
    // Estado para armazenar a user-key
    const [userKey, setUserKey] = useState<string>('');
    // Estado para indicar se a autenticação está sendo verificada
    const [loading, setLoading] = useState(true);

    const [modalVisible, setOpen] = useState(false);

    useEffect(() => {
        // Função assíncrona para verificar a autenticação ao carregar o componente
        const checkAuthentication = async () => {
            // Obtenha a user-key armazenada nos cookies
            const storedUserKey = Cookies.get('user-key');
            if (storedUserKey) {
                // Se a user-key existir, atualize o estado
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
                        // Se a autenticação for bem-sucedida, atualize o estado de carregamento para indicar que a verificação foi concluída
                        setLoading(false);
                    } else {
                        // Se a autenticação falhar, exiba uma mensagem de erro
                        message.error('Falha na autenticação. Por favor, insira uma User Key válida.');
                        // Mantenha a tela de autenticação
                        setLoading(false);
                    }
                } catch (error) {
                    // Exiba uma mensagem de erro em caso de falha na conexão com a API
                    console.error('Erro ao conectar com a API do Ploomes:', error);
                    message.error('Erro ao conectar com a API do Ploomes. Tente novamente mais tarde.');
                    // Mantenha a tela de autenticação
                    setLoading(false);
                }
            } else {
                // Se não houver user-key nos cookies, indique que a verificação foi concluída
                setLoading(false);
            }
        };

        // Chame a função de verificação ao montar o componente
        checkAuthentication();
    }, []); // O array vazio assegura que useEffect seja chamado apenas uma vez, equivalente a componentDidMount

    // Manipulador de evento para alterações na user-key
    const handleUserKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserKey(event.target.value);
    };

    // Manipulador de evento para salvar a user-key
    const handleSaveUserKey = () => {
        if (userKey.trim() === '') {
            // Verifique se a user-key não está vazia
            message.warning('Por favor, insira uma User Key para prosseguir.');
            return;
        }

        // Salvar a user-key nos cookies
        Cookies.set('user-key', userKey, { expires: 1 }); // Cookie válido por 1 dia
        // Indique que a verificação foi concluída
        setLoading(false);
        message.success('User Key salva com sucesso!');
    };

    // Renderize a tela de carregamento enquanto a autenticação estiver sendo verificada
    if (loading) {
        return <div>Verificando autenticação...</div>;
    }

    // Renderize a tela de autenticação normalmente
    return (
        <Card title="Autenticação">
            <div>
                <label>
                    User Key:
                    <Input value={userKey} onChange={handleUserKeyChange} />
                </label>
                <Button onClick={handleSaveUserKey}>Salvar UK</Button>
            </div>
        </Card>
    );
};

export default AuthenticationPage;