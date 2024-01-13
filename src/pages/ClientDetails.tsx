import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Card, Space, notification } from 'antd';
import Cookies from 'js-cookie';
import ClientDelete from '../components/ClientDelete';

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
}

const ClientDetails: React.FC = () => {
    // Obtém o parâmetro da URL (ID do cliente)
    const { clientId } = useParams();
    // Estado para armazenar os detalhes do cliente
    const [client, setClient] = useState<Client | null>(null);
    // Hook para navegação programática
    const navigate = useNavigate();

    useEffect(() => {
        // Função assíncrona para buscar detalhes do cliente ao montar o componente
        const fetchClientDetails = async () => {
            try {
                // Realiza uma solicitação GET para obter os detalhes do cliente
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$filter=Id eq ${clientId}&$expand=Phones($expand=Type)`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': Cookies.get('user-key') ?? '',
                    },
                });

                if (response.ok) {
                    // Se a solicitação for bem-sucedida, extrai os dados do cliente
                    const data = await response.json();
                    // Como o filtro é pelo Id, espera-se um único resultado
                    const selectedClient = data.value[0];
                    // Atualiza o estado com os detalhes do cliente
                    setClient(selectedClient);
                } else {
                    notification.error({
                        message: 'Erro na busca de clientes!',
                        duration: 3,
                    });
                    // Se houver um erro na busca dos detalhes do cliente, registra no console
                    console.error('Erro ao buscar detalhes do cliente');
                }
            } catch (error) {
                notification.error({
                    message: 'Erro na requisição à API!',
                    description: 'Tente novamente mais tarde.',
                    duration: 3,
                });
                // Trata erros na requisição à API
                console.error('Erro na requisição à API:', error);
            }
        };

        // Chama a função de busca ao montar o componente (com dependência no clientId)
        fetchClientDetails();
    }, [clientId]);

    // Função para lidar com o cancelamento da visualização
    const handleReturn = () => {
        // Redireciona de volta para a página de clientes
        navigate(`/clients/`);
    };

    return (
        <div className="container">
            {/* Botão de voltar redireciona para a tela de clientes */}
            <Button type="default" onClick={handleReturn} >
                Voltar
            </Button>
            <Card title="Detalhes do cliente">
                {/* Renderiza os detalhes do cliente se existirem */}
                {client && (
                    <div>

                        {/* Componente Descriptions do Ant Design para exibir detalhes do cliente */}
                        <Descriptions title={client.Name}>

                            <Descriptions.Item label="Email">
                                {client.Email}
                            </Descriptions.Item>

                            {/* Renderiza os telefones do cliente se existirem */}
                            {client.Phones && client.Phones.length > 0 && (
                                <Descriptions.Item label="Telefones">
                                    {client.Phones.map(phone => (
                                        <div key={phone.Id}>
                                            <p>{phone.Type.Name}: {phone.PhoneNumber}</p>
                                        </div>
                                    ))}
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {/* Componente Space do Ant Design para espaçamento adequado entre os botões */}
                        <Space>
                            {/* Botão de excluir baseado no componente, que é executado e depois redireciona para tela de clientes */}
                            <ClientDelete clientId={client.Id} onDelete={() => navigate('/clients')} children={undefined} />

                            {/* Botão de editar redireciona para a página de edição */}
                            <Link to={`/clients/${clientId}/edit`}>
                                <Button type="primary">Editar cliente</Button>
                            </Link>

                        </Space>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ClientDetails;