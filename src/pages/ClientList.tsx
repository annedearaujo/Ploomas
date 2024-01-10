import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Row, Pagination, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const itemsPerPage = 10;
    const totalClients = 50; // Defina o número total de clientes aqui

    const fetchClients = async () => {
        try {
            let apiUrl = `https://public-api2.ploomes.com/Contacts?$top=${itemsPerPage}&$skip=${(pageNumber - 1) * itemsPerPage}`;

            if (searchTerm) {
                apiUrl = `https://public-api2.ploomes.com/Contacts?$filter=contains(Name, '${searchTerm}')`;
            }

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setClients(data.value);
            } else {
                console.error('Erro ao buscar lista de clientes');
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [pageNumber, searchTerm]);

    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setPageNumber(1); // Resetar a página ao iniciar uma nova busca
        fetchClients();
    };

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
        setSearchTerm(''); // Limpar o termo de busca ao fechar o campo de pesquisa
    };

    return (
        <div>
            <Row justify="space-between" align="middle">
                <h2>Lista de Clientes</h2>
                <Link to="/clients/create">
                    <Button type="primary">Adicionar cliente</Button>
                </Link>
                {isSearchVisible ? (
                    <Input
                        placeholder="Digite o nome do cliente"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        style={{ width: 200, marginRight: '8px' }}
                    />
                ) : null}
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={toggleSearchVisibility}
                />
            </Row>
            <List
                dataSource={clients}
                renderItem={(client: any) => (
                    <List.Item>
                        <Link to={`/clients/${client.Id}`}>{client.Name}</Link>
                    </List.Item>
                )}
            />
            <Row justify="center">
                <Pagination
                    current={pageNumber}
                    pageSize={itemsPerPage}
                    total={totalClients}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </Row>
        </div>
    );
};

export default ClientList;