import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Row } from 'antd';
import Cookies from 'js-cookie';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 10;

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
        }
    }

    useEffect(() => {
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

        fetchClients();
    }, [pageNumber]);

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
                <Button onClick={goToPreviousPage}>Página Anterior</Button>
                <Button onClick={() => setPageNumber((prev) => prev + 1)}>Próxima Página</Button>
            </Row>
        </div>
    );
};

export default ClientList;