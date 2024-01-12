import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Input, Modal, Tooltip, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

interface UserKeyPopupProps {
    onSave: (userKey: string) => void;
    visible: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserKeyPopup: React.FC<{ onSave: (userKey: string) => void }> = ({ onSave }) => {
    // Estado para controlar a abertura e fechamento do modal
    const [open, setOpen] = useState(false);
    // Estado para armazenar a user-key
    const [userKey, setUserKey] = useState<string>(Cookies.get('user-key') ?? '');

    // Função para lidar com o clique no botão para abrir o modal
    const handleButtonClick = () => {
        setOpen(true);
    };

    // Função para lidar com o clique no botão "Salvar" no modal
    // const handleSaveClick = () => {
    //     // Salva a user-key nos cookies com uma validade de 1 dia
    //     Cookies.set('user-key', userKey, { expires: 1 });
    //     // Fecha o modal após salvar a user-key
    //     setOpen(false);
    // };

    const handleSaveClick = () => {
        if (userKey.trim() === '') {
            message.warning('Por favor, insira uma user key para prosseguir.');
            return;
        }

        message.success('User key salva com sucesso!');

        // Salva a user-key nos cookies com uma validade de 1 dia
        Cookies.set('user-key', userKey, { expires: 1 });
        // Fecha o modal após salvar a user-key
        setOpen(false);
    };

    // Função para lidar com o cancelamento e fechar o modal
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Botão de edição da user-key com ícone de sincronização */}
            <Tooltip title="Clique para editar a user-key">
                <Button icon={<SyncOutlined />} onClick={handleButtonClick}>
                    User-Key
                </Button>
            </Tooltip>

            {/* Modal para editar a user-key */}
            <Modal
                title="User-Key"
                open={open}
                onOk={handleSaveClick}
                onCancel={handleCancel}
                style={{ right: 0, left: 'auto' }}
            >
                {/* Campo de entrada para a user-key dentro do modal */}
                <Input value={userKey} onChange={(e) => setUserKey(e.target.value)} />
            </Modal>
        </>
    );
};

export default UserKeyPopup;