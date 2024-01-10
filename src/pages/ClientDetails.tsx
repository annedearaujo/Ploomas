import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Descriptions, Button } from 'antd';

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    // Adicionar mais campos
}

const ClientDetails: React.FC = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState<Client | null>(null); // Estado para armazenar os detalhes do cliente

    useEffect(() => {
        // Lógica para buscar os detalhes do cliente da API usando a User-Key e clientId
        // Atualize o estado 'client' com os dados recuperados
    }, [clientId]);

    return (
        <div>
            <h2>Detalhes do Cliente</h2>
            {client && (
                <div>
                    <Descriptions title={client.Name}>
                        <Descriptions.Item label="Email">{client.Email}</Descriptions.Item>
                        <Descriptions.Item label="Telefone">{client.Phone}</Descriptions.Item>
                        {/* Adicione mais detalhes conforme necessário */}
                    </Descriptions>
                    <Link to={`/clients/${clientId}/edit`}>
                        <Button type="primary">Editar Cliente</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ClientDetails;