import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import Cookies from 'js-cookie';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState([]); // Estado para armazenar a lista de clientes
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 10; // Defina o número desejado de itens por página

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`https://public-api2.ploomes.com/Contacts?$top=${itemsPerPage}&$skip=${(pageNumber - 1) * itemsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Key': Cookies.get('user-key') || '', // Certifique-se de importar Cookies do 'js-cookie'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setClients(data.value); // Atualiza o estado com os dados dos clientes
                } else {
                    console.error('Erro ao buscar lista de clientes');
                }
            } catch (error) {
                console.error('Erro na requisição à API:', error);
            }
        };

        fetchClients();
    }, [pageNumber]); // Dependência do useEffect para reexecutar quando a página muda

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <List
                dataSource={clients}
                renderItem={(client: any) => (
                    <List.Item>
                        <Link to={`/clients/${client.Id}`}>{client.Name}</Link>
                    </List.Item>
                )}
            />
            <Link to="/clients/create">
                <Button type="primary">Adicionar cliente</Button>
            </Link>
            <Button onClick={() => setPageNumber((prev) => prev + 1)}>Próxima página</Button>
        </div>
    );
};

export default ClientList;