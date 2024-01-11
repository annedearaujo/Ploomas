import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ClientSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://public-api2.ploomes.com/Contacts?$filter=contains(Name, '${searchTerm}') or contains(Email, '${searchTerm}') or Phones/any(p: contains(p/PhoneNumber, '${searchTerm}'))`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.value);
            } else {
                console.error('Erro ao buscar clientes');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
        }
    };

    return (
        <div>
            <h2>Buscar clientes</h2>
            <Input
                placeholder="Digite o nome, email ou telefone do cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '8px' }}
            />
            <Button type="primary" onClick={handleSearch}>
                Buscar
            </Button>
            <List
                dataSource={searchResults}
                renderItem={(client: any) => (
                    <List.Item>
                        <Link to={`/clients/${client.Id}`}>{client.Name}</Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ClientSearch;