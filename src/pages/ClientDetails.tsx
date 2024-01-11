import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Modal, Card, Row, Col, Space } from 'antd';
import Cookies from 'js-cookie';
import ClientDelete from '../components/ClientDelete';

const { Meta } = Card;

// Interface para tipagem do telefone
interface Phone {
    Id: number;
    PhoneNumber: string;
    Type: {
        Id: number;
        Name: string;
    };
}

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phones?: Phone[];
    // Adicionar mais campos conforme necessário
}

const ClientDetails: React.FC = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState<Client | null>(null); // Estado para armazenar os detalhes do cliente
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$filter=Id eq ${clientId}&$expand=Phones($expand=Type)`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': Cookies.get('user-key') || '',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Como o filtro é pelo Id, espera-se um único resultado
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

    const handleCancel = () => {
        // Redirecionar de volta para a página de clientes
        navigate(`/clients/`);
    };

    return (
        <div className="container">
            <Card title="Detalhes do cliente">
                {client && (
                    <div>
                        <Descriptions title={client.Name}>
                            <Descriptions.Item label="Email">{client.Email}</Descriptions.Item>
                            {client.Phones && client.Phones.length > 0 && (
                                <Descriptions.Item label="Telefones">
                                    {client.Phones.map(phone => (
                                        <div key={phone.Id}>
                                            <p>{phone.Type.Name}: {phone.PhoneNumber}</p>
                                        </div>
                                    ))}
                                </Descriptions.Item>
                            )}
                            {/* Adicione mais detalhes conforme necessário */}
                        </Descriptions>
                        <Space>
                        <ClientDelete clientId={client.Id} onDelete={() => navigate('/clients')} children={undefined} />
                        <Link to={`/clients/${clientId}/edit`}>
                            <Button type="primary">Editar cliente</Button>
                        </Link>
                        <Button type="default" onClick={handleCancel} >
                            Voltar
                        </Button>
                        </Space>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ClientDetails;