import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phones: { Id: number; PhoneNumber: string; Type: { Id: number; Name: string } }[];
    // Adicione mais campos conforme necessário
}

const ClientEdit: React.FC = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null); // Estado para armazenar os detalhes do cliente

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$expand=Phones($expand=Type)&$filter=Id eq ${clientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': 'sua-chave-de-usuario-aqui', // Substitua pela sua chave de usuário
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
            // Lógica para enviar os dados atualizados do cliente para a API usando a User-Key e clientId
            // Atualize o corpo da requisição conforme necessário para refletir a estrutura correta
            const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': 'sua-chave-de-usuario-aqui', // Substitua pela sua chave de usuário
                },
                body: JSON.stringify({
                    // Atualize com os campos corretos
                    Name: values.Name,
                    Email: values.Email,
                    Phones: values.Phones, // Certifique-se de que a estrutura está correta
                }),
            });

            if (response.ok) {
                navigate(`/clients/${clientId}`);
            } else {
                console.error('Erro ao atualizar os dados do cliente');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
        }
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
                        Phones: client.Phones.map(phone => ({
                            Id: phone.Id,
                            PhoneNumber: phone.PhoneNumber,
                            Type: phone.Type.Name,
                        })),
                        // Adicione mais campos conforme necessário
                    }}
                >
                    <Form.Item label="Nome" name="Name" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Por favor, insira o Email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.List name="Phones">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Form.Item
                                        {...field}
                                        label="Telefone"
                                        name={[field.name, 'PhoneNumber']}
                                        fieldKey={[field.fieldKey || '', 'PhoneNumber']}
                                    >
                                        <Input />
                                    </Form.Item>
                                ))}
                                <Button onClick={() => add()} style={{ marginTop: '8px' }}>
                                    Adicionar Telefone
                                </Button>
                            </>
                        )}
                    </Form.List>
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