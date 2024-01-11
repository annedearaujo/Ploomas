import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Cookies from 'js-cookie';

interface ClientDeleteProps {
    clientId: number;
    onDelete: () => void;
    children: React.ReactNode;
}

const ClientDelete: React.FC<ClientDeleteProps> = ({ clientId, onDelete, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
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

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            icon: <ExclamationCircleFilled />,
            content: 'Tem certeza de que deseja excluir este cliente?',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk: handleOk,
            onCancel: handleCancel,
        });
    };

    return (
        <>
            <Button type="primary" onClick={showDeleteConfirm} danger>
                Excluir cliente
            </Button>
            {children}
            {/* <Modal
                title="Confirmar exclusão"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sim"
                cancelText="Não"
                okType="danger"
            >
                <p>Tem certeza de que deseja excluir este cliente?</p>
            </Modal> */}
        </>
    );
};

export default ClientDelete;