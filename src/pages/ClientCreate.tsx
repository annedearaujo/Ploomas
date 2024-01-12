import React from 'react';
import { Form, Input, Button, Card, Space, Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/styles.css';

const { Meta } = Card;

const ClientCreate: React.FC = () => {
    // Hook para navegação programática
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleFormSubmit = async (values: any) => {
        try {
            // Envia uma solicitação POST para criar um novo cliente
            const response = await fetch('https://public-api2.ploomes.com/Contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Obtém a user-key dos cookies (ou uma string vazia se não existir)
                    'User-Key': Cookies.get('user-key') ?? '',
                },
                body: JSON.stringify({
                    Name: values.name,
                    Email: values.email,
                    Phones: values.phone ? [{ PhoneNumber: values.phone, Type: { Id: 1, Name: 'Default' } }] : [],
                }),
            });

            if (response.ok) {
                // Se a solicitação for bem-sucedida, exibe uma notificação e redireciona para a tela de clientes
                notification.success({
                    message: 'Cliente criado com sucesso!',
                    description: 'Agora você pode visualizar o novo cliente na lista.',
                    duration: 3, // Tempo em segundos que a notificação será exibida
                });
                navigate('/clients');
            } else {
                // Se houver um erro na criação do cliente, exibe uma notificação e registra no console
                notification.error({
                    message: 'Erro ao criar o cliente!',
                    description: 'Tente novamente mais tarde.',
                    duration: 3,
                });
                console.error('Erro ao criar novo cliente');
            }
        } catch (error) {
            // Trata erros na requisição à API
            console.error('Erro na requisição à API:', error);
        }
    };

    // Função para lidar com o cancelamento do formulário
    const handleCancel = () => {
        // Redireciona de volta para a página de clientes
        navigate(`/clients/`);
    };

    return (
        <div className="container">
            <Card title="Criar cliente">

                <Form onFinish={handleFormSubmit}>
                    {/* Formulário de criação do cliente */}
                    <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                        <Input placeholder="Digite o nome do cliente" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email' }]}>
                        <Input placeholder="Digite o email do cliente" />
                    </Form.Item>
                    <Form.Item label="Telefone" name="phone">
                        <Input placeholder="Digite o telefone do cliente" />
                    </Form.Item>

                    <Space>
                        <>
                            {/* Botões de ação */}
                            <Button type="default" onClick={handleCancel} style={{ marginLeft: '8px' }} danger>
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Criar
                            </Button>
                        </>
                    </Space>
                </Form>

            </Card>
        </div>
    );
};

export default ClientCreate;