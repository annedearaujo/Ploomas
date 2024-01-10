import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import { Link } from 'react-router-dom';

// Interface para tipagem do cliente
interface Client {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    // Adicionar mais campos
}

const ClientSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Client[]>([]);

    const handleSearch = () => {
        // Lógica para buscar clientes da API com base no searchTerm usando a User-Key
        // Atualize o estado 'searchResults' com os dados recuperados
    };

    return (
        <div>
            <h2>Pesquisar Clientes</h2>
            <Input
                placeholder="Digite o nome, e-mail ou telefone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={handleSearch}>
                Pesquisar
            </Button>
            <List
                dataSource={searchResults}
                renderItem={(client: Client) => (
                    <List.Item>
                        <Link to={`/clients/${client.Id}`}>{client.Name}</Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ClientSearch;