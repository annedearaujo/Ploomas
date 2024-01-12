import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Row, Pagination, Input, Col, Modal, Card, Tooltip, notification } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import '../styles/styles.css';

const { Meta } = Card;

const ClientList: React.FC = () => {
    // Estado para armazenar a lista de clientes
    const [clients, setClients] = useState([]);
    // Estado para controlar o número da página atual
    const [pageNumber, setPageNumber] = useState(1);
    // Estado para armazenar o termo de busca
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para controlar a visibilidade do campo de busca
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const itemsPerPage = 10;
    const totalClients = 50; // Número total de clientes aqui

    // Função para buscar os clientes da API
    const fetchClients = async () => {
        try {
            // Constrói a url da requisição geral de clientes com paginação
            let apiUrl = `https://public-api2.ploomes.com/Contacts?$top=${itemsPerPage}&$skip=${(pageNumber - 1) * itemsPerPage}`;

            // Constrói a url da requisição se houver algum termo de busca
            if (searchTerm) {
                apiUrl = `https://public-api2.ploomes.com/Contacts?$filter=contains(Name, '${searchTerm}') or contains(Email, '${searchTerm}') or Phones/any(p: contains(p/PhoneNumber, '${searchTerm}'))`;
            }

            // Realiza uma solicitação GET para obter a lista de clientes
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': Cookies.get('user-key') ?? '',
                },
            });

            if (response.ok) {
                // Se a solicitação for bem-sucedida, extrai os dados dos clientes e atualiza o estado
                const data = await response.json();
                setClients(data.value);
            } else {
                // Se houver um erro na busca da lista de clientes, registra no console
                console.error('Erro ao buscar lista de clientes');
            }
        } catch (error) {
            // Trata erros na requisição à API
            console.error('Erro na requisição à API:', error);
        }
    };

    // Efeito para buscar clientes sempre que a página, o termo de busca ou a visibilidade do campo de busca mudarem
    useEffect(() => {
        fetchClients();
    }, [pageNumber, searchTerm, isSearchVisible]);

    // Função para lidar com a mudança de página
    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    // Função para lidar com a mudança no termo de busca
    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Função para lidar com o clique no botão de busca
    // const handleSearch = () => {
    //     setPageNumber(1); // Resetar a página ao iniciar uma nova busca
    //     fetchClients();
    // };
    const handleSearch = async () => {
        setPageNumber(1);
        try {
            await fetchClients();
            notification.success({
                message: 'Busca realizada com sucesso',
                duration: 3, // Tempo em segundos que a notificação será exibida
            });
        } catch (error) {
            notification.error({
                message: 'Erro na busca de clientes',
                duration: 3,
            });
        }
    };

    // Função para alternar a visibilidade do campo de busca
    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
        setSearchTerm(''); // Limpar o termo de busca ao fechar o campo de pesquisa
    };

    

    // Função para exibir o modal de confirmação ao clicar no ícone de deletar um cliente
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
                    // Realiza uma solicitação DELETE para excluir o cliente
                    const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Key': Cookies.get('user-key') ?? '',
                        },
                    });

                    if (response.ok) {
                        // Atualize a lista após a exclusão
                        fetchClients();
                    } else {
                        // Se houver um erro na exclusão do cliente, registra no console
                        console.error('Erro ao excluir cliente');
                    }
                } catch (error) {
                    // Trata erros na requisição à API
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
                {/* Row com gutter para posicionar os botões e o campo de busca */}
                <Row >

                    <Col flex="auto">
                        {/* Link para a página de criação de cliente com botão de adicionar */}
                        <Link to="/clients/create">
                            <Tooltip title="Adicionar cliente">
                                <Button type="primary" icon={<PlusOutlined />}>
                                </Button>
                            </Tooltip>
                        </Link>
                    </Col>

                    {isSearchVisible ? (
                        <Col >
                            {/* Campo de busca visível apenas quando isSearchVisible for verdadeiro */}
                            <Tooltip title="Digite o nome, e-mail ou telefone do cliente">
                                <Input
                                    placeholder="Digite o nome, e-mail ou telefone do cliente"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    style={{ width: 'auto', marginRight: '8px' }}
                                />
                            </Tooltip>
                        </Col>
                    ) : null}

                    {/* Botão de busca com ícone de lupa */}
                    <Tooltip title="Buscar clientes">
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={toggleSearchVisibility}
                        />
                    </Tooltip>
                </Row>

                {/* Lista de clientes */}
                <List
                    className="custom-list"
                    dataSource={clients}
                    renderItem={(client: any) => (
                        <List.Item className="custom-list-item" style={{ padding: '8px 0', fontSize: '16px', width: '100%' }}>

                            {/* Link para a página de detalhes do cliente */}
                            <Link to={`/clients/${client.Id}`}>{client.Name}</Link>

                            {/* Ícones de editar e deletar cliente */}
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

                {/* Paginação */}
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