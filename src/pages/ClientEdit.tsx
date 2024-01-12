import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Card, Tooltip, notification, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { Meta } = Card;

// Interface para os detalhes do cliente
interface ClientEditProps {
    children: React.ReactNode;
}

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phones: { Id: number; PhoneNumber: string; Type: { Id: number; Name: string } }[];
}

const ClientEdit: React.FC<ClientEditProps> = ({ children }) => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);
    // Estado para controlar o carregamento da página
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Busca os detalhes do cliente quando o componente é montado
        const fetchClientDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$expand=Phones($expand=Type)&$filter=Id eq ${clientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': Cookies.get('user-key') ?? '',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const selectedClient = data.value[0];
                    setClient(selectedClient);
                } else {
                    notification.error({
                        message: 'Erro na busca de detalhes do cliente!',
                        duration: 3,
                    });
                    console.error('Erro ao buscar detalhes do cliente');
                }
            } catch (error) {
                console.error('Erro na requisição à API:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientDetails();
    }, [clientId]);

    const handleFormSubmit = async (values: any) => {
        try {
            const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') ?? '',
                },
                body: JSON.stringify({
                    Name: values.Name,
                    Email: values.Email,
                    Phones: values.Phones,
                }),
            });

            if (response.ok) {
                notification.success({
                    message: 'Cliente editado com sucesso!',
                    duration: 3, // Tempo em segundos que a notificação será exibida
                });
                // Redirecionar para a página de detalhes do cliente após a edição
                navigate(`/clients/${clientId}`);
            } else {
                notification.error({
                    message: 'Erro ao editar o cliente!',
                    description: 'Tente novamente mais tarde.',
                    duration: 3,
                });
                console.error('Erro ao atualizar os dados do cliente');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
            notification.error({
                message: 'Erro na conexão com a API!',
                description: 'Verifique sua conexão com a internet e tente novamente.',
                duration: 5,
            });
        }
    };

    const handleCancel = () => {
        // Redirecionar de volta para a página de detalhes do cliente sem salvar as alterações
        navigate(`/clients/${clientId}`);
    };

    return (
        <div className="container">
            <Card title="Editar cliente">
                {client && (
                    <>
                        <Spin spinning={loading}>
                            <Form
                                onFinish={handleFormSubmit}
                                initialValues={{
                                    Name: client.Name,
                                    Email: client.Email,
                                    Phones: client.Phones.map(phone => ({
                                        Id: phone.Id,
                                        PhoneNumber: phone.PhoneNumber,
                                        Type: phone.Type.Name,
                                    })),
                                }}
                            >
                                {/* Formulário de edição do cliente */}
                                <Form.Item label="Nome" name="Name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                                    <Input placeholder="Digite o nome do cliente" />
                                </Form.Item>
                                <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Por favor, insira o e-mail' }]}>
                                    <Input placeholder="Digite o e-mail do cliente" />
                                </Form.Item>
                                <Form.List name="Phones">
                                    {/* Lista dinâmica de telefones */}
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(field => (
                                                <Row gutter={8} key={field.key}>
                                                    <Col>
                                                        <Form.Item
                                                            {...field}
                                                            label="Telefone"
                                                            name={[field.name, 'PhoneNumber']}
                                                            fieldKey={[field.fieldKey ?? '', 'PhoneNumber']}
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
                                <Form.Item>
                                    <Row gutter={8}>
                                        <Col>
                                            <Button type="default" onClick={handleCancel} danger>
                                                Cancelar
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button type="primary" htmlType="submit">
                                                Salvar Alterações
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Spin>
                        {children}
                    </>
                )}
            </Card>
        </div>
    );
};

export default ClientEdit;