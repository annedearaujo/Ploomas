import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Space, Modal, Card, } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import ClientDelete from '../components/ClientDelete';

const { Meta } = Card;

interface ClientEditProps {
    children: React.ReactNode;
}

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phones: { Id: number; PhoneNumber: string; Type: { Id: number; Name: string } }[];
    // Adicionar mais campos conforme necessário
}

const ClientEdit: React.FC<ClientEditProps> = ({ children }) => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$expand=Phones($expand=Type)&$filter=Id eq ${clientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': Cookies.get('user-key') || '',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const selectedClient = data.value[0];
                    setClient(selectedClient);
                } else {
                    console.error('Erro ao buscar detalhes do cliente');
                }
            } catch (error) {
                console.error('Erro na requisição à API:', error);
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
                    'User-Key': Cookies.get('user-key') || '',
                },
                body: JSON.stringify({
                    Name: values.Name,
                    Email: values.Email,
                    Phones: values.Phones,
                    // Adicione mais campos conforme necessário
                }),
            });

            if (response.ok) {
                // Redirecionar para a página de detalhes do cliente após a edição
                navigate(`/clients/${clientId}`);
            } else {
                console.error('Erro ao atualizar os dados do cliente');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
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
                                // Adicione mais campos conforme necessário
                            }}
                        >
                            <Form.Item label="Nome" name="Name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                                <Input placeholder="Digite o nome do cliente" />
                            </Form.Item>
                            <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Por favor, insira o e-mail' }]}>
                                <Input placeholder="Digite o e-mail do cliente" />
                            </Form.Item>
                            <Form.List name="Phones">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(field => (
                                            <Row gutter={8} key={field.key}>
                                                <Col>
                                                    <Form.Item
                                                        {...field}
                                                        label="Telefone"
                                                        name={[field.name, 'PhoneNumber']}
                                                        fieldKey={[field.fieldKey || '', 'PhoneNumber']}
                                                    >
                                                        <Input placeholder="Digite o telefone do cliente" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    />
                                                </Col>
                                                <Col>
                                                    {fields.length > 1 && (
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                            {/* Adicione mais campos conforme necessário */}
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
                        {/* <Row justify="end">
                            <Col>
                                <ClientDelete clientId={client.Id} onDelete={() => navigate('/clients')} children={undefined} />
                            </Col>
                        </Row> */}
                        {children}
                    </>
                )}
            </Card>
        </div>
    );
};

export default ClientEdit;