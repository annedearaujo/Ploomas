import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    // Adicionar mais campos
}

const ClientEdit: React.FC = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null); // Estado para armazenar os detalhes do cliente

    useEffect(() => {
        // Lógica para buscar os detalhes do cliente da API usando a User-Key e clientId
        // Atualize o estado 'client' com os dados recuperados
    }, [clientId]);

    const handleFormSubmit = (values: any) => {
        // Lógica para enviar os dados atualizados do cliente para a API usando a User-Key e clientId
        // Após a conclusão, redirecione para a página de detalhes do cliente
        navigate(`/clients/${clientId}`);
    };

    return (
        <div>
            <h2>Editar Cliente</h2>
            {client && (
                <Form
                    onFinish={handleFormSubmit}
                    initialValues={{
                        Name: client.Name,
                        Email: client.Email,
                        Phone: client.Phone,
                        // Adicione mais campos conforme necessário
                    }}
                >
                    <Form.Item label="Nome" name="Name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Por favor, insira o Email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Telefone" name="Phone">
                        <Input />
                    </Form.Item>
                    {/* Adicione mais campos conforme necessário */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Salvar Alterações
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default ClientEdit;