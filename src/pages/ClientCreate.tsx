import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ClientCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (values: any) => {
        // Lógica para enviar os dados do novo cliente para a API usando a User-Key
        // Após a conclusão, redirecione para a página de listagem de clientes
        navigate('/clients');
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
                </Form.Item>
            </Form>
        </div>
    );
};

export default ClientCreate;