import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Row, Pagination, Input, Col, Modal, Card, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import ClientDelete from '../components/ClientDelete';
import ClientEdit from './ClientEdit';
import '../styles/styles.css';

const { Meta } = Card;

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
                apiUrl = `https://public-api2.ploomes.com/Contacts?$filter=contains(Name, '${searchTerm}') or contains(Email, '${searchTerm}') or Phones/any(p: contains(p/PhoneNumber, '${searchTerm}'))`;
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
    }, [pageNumber, searchTerm, isSearchVisible]); //isSearchVisible é uma dependência no array de dependências do useEffect para que o efeito seja executado quando o estado isSearchVisible for alterado. 

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

    const showDeleteModal = (clientId: number) => {
        Modal.confirm({
            title: 'Confirmar Exclusão',
            content: 'Tem certeza de que deseja excluir este cliente?',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                // Lógica de exclusão aqui
                try {
                    const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Key': Cookies.get('user-key') || '',
                        },
                    });

                    if (response.ok) {
                        // Atualize a lista após a exclusão
                        fetchClients();
                    } else {
                        console.error('Erro ao excluir cliente');
                    }
                } catch (error) {
                    console.error('Erro na requisição à API:', error);
                }
            },
            onCancel: () => {
                // Ação ao cancelar
            },
        });
    };


    return (
        <div className="container">
                    <Card title="Lista de clientes">
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col flex="auto">
                                <Link to="/clients/create">
                                    <Tooltip title="Adicionar cliente">
                                        <Button type="primary" icon={<PlusOutlined />}>
                                            
                                        </Button>
                                    </Tooltip>
                                </Link>
                            </Col>
                            {isSearchVisible ? (
                                <Col xs={24} sm={12} md={8} lg={6} xl={4}> 
                                <Tooltip title="Digite o nome, e-mail ou telefone do cliente">
                                <Input
                                    placeholder="Digite o nome, e-mail ou telefone do cliente"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    style={{ width: 200, marginRight: '8px' }}
                                />
                                </Tooltip>
                                </Col>
                            ) : null}
                            <Tooltip title="Buscar clientes">
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                onClick={toggleSearchVisibility}
                            />
                            </Tooltip>

                        </Row>
                        <List
                            className="custom-list"
                            dataSource={clients}
                            renderItem={(client: any) => (
                                <List.Item className="custom-list-item" style={{ padding: '8px 0', fontSize: '16px', width: '100%' }}>
                                    <Link to={`/clients/${client.Id}`}>{client.Name}</Link>
                                    <span style={{ marginLeft: '8px' }}>
                                        <Link to={`/clients/${client.Id}/edit`}>
                                            <Tooltip title="Editar cliente">
                                            <EditOutlined style={{ marginRight: '8px' }} />
                                            </Tooltip>
                                        </Link>
                                        <Tooltip title="Deletar cliente">
                                        <DeleteOutlined onClick={() => showDeleteModal(client.Id)} style={{ color: 'red' }} />
                                        </Tooltip>
                                    </span>
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
                    </Card>
        </div >
    );
};

export default ClientList;