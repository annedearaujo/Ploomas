import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        <div>
            <h2>Criar Novo Cliente</h2>
            <Form onFinish={handleFormSubmit}>
                <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Telefone" name="phone">
                    <Input />
                </Form.Item>
                {/* Adicione mais campos conforme necessário */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Criar Cliente
                    </Button>
                    <Button type="default" onClick={handleCancel} style={{ marginLeft: '8px' }} danger>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ClientCreate;