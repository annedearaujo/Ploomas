import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Row, Pagination } from 'antd'; // Importando a Pagination do ANT
import Cookies from 'js-cookie';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 10;
    const totalClients = 50; // Defina o número total de clientes aqui

    const fetchClients = async () => {
        try {
            const response = await fetch(`https://public-api2.ploomes.com/Contacts?$top=${itemsPerPage}&$skip=${(pageNumber - 1) * itemsPerPage}`, {
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
    }, [pageNumber]);

    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    return (
        <div>
            <Row justify="space-between" align="middle">
                <h2>Lista de Clientes</h2>
                <Link to="/clients/create">
                    <Button type="primary">Adicionar cliente</Button>
                </Link>
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
                    showSizeChanger={false} // Defina como true se quiser permitir que o usuário escolha a quantidade de itens por página
                />
            </Row>
        </div>
    );
};

export default ClientList;