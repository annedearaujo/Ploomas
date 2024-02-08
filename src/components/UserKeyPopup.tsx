import React from 'react';
import Cookies from 'js-cookie';
import { Button, Input, Modal, Tooltip, message, notification } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useUserKey } from '../contexts/UserKeyContext';

const UserKeyPopup: React.FC = () => {
    const { userKey, setUserKey, openModal, setOpenModal } = useUserKey();

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleSaveClick = async () => {
        try {
            // Enviar a requisição para autenticar a chave do usuário
            const response = await fetch('https://public-api2.ploomes.com/Self/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': userKey,
                },
            });

            if (response.ok) {
                // Autenticação bem-sucedida
                // Salvar a chave nos cookies
                Cookies.set('user-key', userKey, { expires: 1 }); // Cookie válido por 1 dia

                notification.success({
                    message: 'Autenticação bem-sucedida!',
                });
            } else if (userKey.trim() === '') {
                message.warning('Por favor, insira uma user key para prosseguir.');
                return;
            } else {
                // Autenticação falhou
                notification.error({
                    message: 'Erro na autenticação. Tente novamente.',
                });
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
        }
        setOpenModal(false);

        // Atualize o estado global com a nova user-key
        setUserKey(userKey);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Tooltip title="Clique para editar a user-key">
                <Button icon={<KeyOutlined />} onClick={handleButtonClick}>
                    Chave de usuário
                </Button>
            </Tooltip>

            <Modal
                title="Chave de usuário"
                open={openModal}
                onOk={handleSaveClick}
                onCancel={handleCancel}
                okText='Salvar'
                cancelText='Cancelar'
                style={{ right: 0, left: 'auto' }}
            >
                <Input value={userKey} onChange={(e) => setUserKey(e.target.value)} />
            </Modal>
        </>
    );
};

export default UserKeyPopup;