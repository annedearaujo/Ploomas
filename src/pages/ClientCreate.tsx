import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Tooltip, Space, notification, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/styles.css';

const ClientCreate: React.FC = () => {
    // Estado para controlar o carregamento da página
    const [loading, setLoading] = useState(false);
    // Hook para navegação programática
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleFormSubmit = async (values: any) => {
        try {
            setLoading(true);
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
                    Phones: values.phones.map((phone: string) => ({
                        PhoneNumber: phone,
                        Type: { Id: 1, Name: 'Default' },
                    })),
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
                // Se houver um erro na criação do cliente, tenta obter informações adicionais do corpo da resposta
                const errorData = await response.json();
                // Exibe uma notificação para o usuário
                notification.error({
                    message: 'Erro ao criar o cliente!',
                    description: errorData?.error?.message ?? 'Tente novamente mais tarde.',
                    duration: 3,
                });
                // Registra o erro no console
                console.error('Erro ao criar novo cliente');
            }
        } catch (error) {
            // Exibe uma notificação para o usuário
            notification.error({
                message: 'Erro na requisição à API!',
                description: 'Verifique sua conexão com a internet e tente novamente.',
                duration: 3,
            });
            // Trata erros na requisição à API
            console.error('Erro na requisição à API:', error);
        } finally {
            setLoading(false);
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
                <Spin spinning={loading}>
                    <Form onFinish={handleFormSubmit} labelAlign="left">
                        {/* Formulário de criação do cliente */}
                        <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                            <Input placeholder="Digite o nome do cliente" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email' }]}>
                            <Input placeholder="Digite o email do cliente" />
                        </Form.Item>
                        <Form.List name="phones" initialValue={[{ PhoneNumber: '' }]}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                        <Row key={field.key}>
                                            <Col>
                                                <Form.Item
                                                    {...field}
                                                    label="Telefone"
                                                    name={[field.name, 'PhoneNumber']}
                                                    fieldKey={[field.fieldKey ?? '', 'PhoneNumber']}
                                                    rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
                                                >
                                                    <Input placeholder="Digite o telefone do cliente" />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Tooltip title="Adicionar outro número de telefone">
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    />
                                                </Tooltip>
                                            </Col>
                                            <Col>
                                                {fields.length > 1 && (
                                                    <Tooltip title="Remover número de telefone">
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Col>
                                        </Row>
                                    ))}

                                </>
                            )}
                        </Form.List>
                        <Space>
                            <>
                                {/* Botões de ação */}
                                <Button type="default" onClick={handleCancel} danger>
                                    Cancelar
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Criar
                                </Button>
                            </>
                        </Space>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default ClientCreate;