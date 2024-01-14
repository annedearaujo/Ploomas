import React from 'react';
import Cookies from 'js-cookie';
import { Button, Input, Modal, Tooltip, message } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useUserKey } from '../contexts/UserKeyContext';

const UserKeyPopup: React.FC = () => {
    const { userKey, setUserKey, openModal, setOpenModal } = useUserKey();

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleSaveClick = () => {
        if (userKey.trim() === '') {
            message.warning('Por favor, insira uma user key para prosseguir.');
            return;
        }

        message.success('User key salva com sucesso!');
        Cookies.set('user-key', userKey, { expires: 1 });
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
                    User-Key
                </Button>
            </Tooltip>

            <Modal
                title="user-key"
                visible={openModal}
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