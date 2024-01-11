import React from 'react';
import { Form, Input, Button, Modal, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/styles.css';

const { Meta } = Card;

const ClientCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (values: any) => {
        try {
            const response = await fetch('https://public-api2.ploomes.com/Contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') || '',
                },
                body: JSON.stringify({
                    Name: values.name,
                    Email: values.email,
                    Phones: values.phone ? [{ PhoneNumber: values.phone, Type: { Id: 1, Name: 'Default' } }] : [],
                    // Adicione mais campos conforme necessário
                }),
            });

            if (response.ok) {
                // Lógica para tratamento de sucesso
                navigate('/clients');
            } else {
                console.error('Erro ao criar novo cliente');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
        }
    };

    const handleCancel = () => {
        // Redirecionar de volta para a página de clientes
        navigate(`/clients/`);
    };

    return (
        <div className="container">
            <Card title="Criar cliente">
                <Form onFinish={handleFormSubmit}>
                    <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}
                    labelCol={{ span: 4 }}>
                        <Input placeholder="Digite o nome do cliente" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email' }]}
                    labelCol={{ span: 4 }}>
                        <Input placeholder="Digite o email do cliente" />
                    </Form.Item>
                    <Form.Item label="Telefone" name="phone"
                    labelCol={{ span: 4 }}>
                        <Input placeholder="Digite o telefone do cliente" />
                    </Form.Item>
                    {/* Adicione mais campos conforme necessário */}
                    <Form.Item 
                    labelCol={{ span: 4 }}>
                        <Button type="primary" htmlType="submit">
                            Criar
                        </Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: '8px' }} danger>
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ClientCreate;