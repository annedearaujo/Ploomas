import React, { useState } from 'react';
import { Input, Button, List, notification } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ClientSearchProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch: () => void;
    isSearchVisible: boolean;
    onToggleSearchVisibility: () => void;
}

const ClientSearch: React.FC = () => {
    // Estado para armazenar o termo de busca
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para armazenar os resultados da busca
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        // Função para lidar com a busca de clientes
        try {
            // Realiza uma solicitação GET para buscar clientes com base no termo de busca
            const response = await fetch(`https://public-api2.ploomes.com/Contacts?$filter=contains(Name, '${searchTerm}') or contains(Email, '${searchTerm}') or Phones/any(p: contains(p/PhoneNumber, '${searchTerm}'))`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') ?? '',
                },
            });

            if (response.ok) {
                // Se a solicitação for bem-sucedida, extrai os dados dos clientes e atualiza o estado
                const data = await response.json();
                if (data.value.length === 0) {
                    notification.info({
                        message: 'Nenhum resultado encontrado!',
                        duration: 3,
                    });
                } else {
                    notification.success({
                        message: 'Busca realizada com sucesso!',
                        duration: 3,
                    });
                    setSearchResults(data.value);
                }
            } else {
                notification.error({
                    message: 'Erro na busca de clientes!',
                    duration: 3,
                });
                // Se houver um erro na busca de clientes, registra no console
                console.error('Erro ao buscar clientes');
            }
        } catch (error) {
            notification.error({
                message: 'Erro na requisição à API!',
                description: 'Tente novamente mais tarde',
                duration: 3,
            });
            // Trata erros na requisição à API
            console.error('Erro na requisição à API:', error);
        }
    };

    return (
        <div>
            <h2>Buscar clientes</h2>

            {/* Campo de entrada para o termo de busca */}
            <Input
                placeholder="Digite o nome, email ou telefone do cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '8px' }}
            />

            {/* Botão de busca que aciona a função de busca */}
            <Button type="primary" onClick={handleSearch}>
                Buscar
            </Button>

            {/* Lista de resultados da busca */}
            <List
                dataSource={searchResults}
                // Renderiza cada cliente na lista como um link para a página de detalhes do cliente
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