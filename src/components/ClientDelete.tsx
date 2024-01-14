import React, { useState } from 'react';
import { Modal, Button, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Cookies from 'js-cookie';

interface ClientDeleteProps {
    clientId: number;
    onDelete: () => void;
    children: React.ReactNode;
}

const ClientDelete: React.FC<ClientDeleteProps> = ({ clientId, onDelete, children }) => {
    // Estado para controlar a abertura e fechamento do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para lidar com a confirmação de exclusão
    const handleOk = async () => {
        try {
            // Realiza uma solicitação DELETE para excluir o cliente
            const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') ?? '',
                },
            });

            if (response.ok) {
                notification.success({
                    message: 'Cliente deletado com sucesso!',
                    duration: 3, // Tempo em segundos que a notificação será exibida
                });
                // Se a deleção for bem-sucedida, chame a função onDelete para atualizar a lista
                onDelete();
            } else {
                notification.error({
                    message: 'Erro ao deletar o cliente!',
                    description: 'Tente novamente mais tarde.',
                    duration: 3,
                });
                // Se houver um erro na exclusão do cliente, registra no console
                console.error('Erro ao excluir cliente');
            }
        } catch (error) {
            notification.error({
                message: 'Erro na requisição à API!',
                description: 'Verifique sua conexão com a internet e tente novamente.',
                duration: 3,
            });
            // Trata erros na requisição à API
            console.error('Erro na requisição à API:', error);
        }

        // Fecha o modal após a confirmação
        setIsModalOpen(false);
    };

    // Função para lidar com o cancelamento da exclusão
    const handleCancel = () => {
        // Fecha o modal sem excluir o cliente
        setIsModalOpen(false);
    };

    // Função para exibir o modal de confirmação do Ant Design
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
            {/* Botão de exclusão do cliente que, ao clicar, abre o modal de confirmação */}
            <Button type="primary" onClick={showDeleteConfirm} danger>
                Excluir cliente
            </Button>

            {/* Prop "children" para permitir a adição de elementos adicionais */}
            {children}

        </>
    );
};

export default ClientDelete;