import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Cookies from 'js-cookie';

interface ClientDeleteProps {
    clientId: number;
    onDelete: () => void;
}

const ClientDelete: React.FC<ClientDeleteProps> = ({ clientId, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') || '',
                },
            });

            if (response.ok) {
                // A deleção foi bem-sucedida, chame a função onDelete para atualizar a lista
                onDelete();
            } else {
                console.error('Erro ao excluir cliente');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
        }

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} danger>
                Excluir Cliente
            </Button>
            <Modal
                title="Confirmar Exclusão"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Tem certeza de que deseja excluir este cliente?</p>
            </Modal>
        </>
    );
};

export default ClientDelete;