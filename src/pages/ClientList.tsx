import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, Button, Row, Pagination, Input, Col, Modal, Card, Tooltip, notification, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import '../styles/styles.css';

// Função utilitária para obter o User Key dos cookies
const getUserKey = () => Cookies.get('user-key') ?? '';

// Função utilitária para construir URLs de requisições
const buildApiUrl = (baseURL: string, params = {}) => {
    const queryParams = new URLSearchParams(params);
    return `${baseURL}?${queryParams}`;
};

// Função utilitária para manipulação de cookies
const getCookieUserKey = () => Cookies.get('user-key') ?? '';

const ClientList: React.FC = () => {
    // Estado para armazenar a lista de clientes
    const [clients, setClients] = useState([]);
    // Estado para controlar o número da página atual
    const [pageNumber, setPageNumber] = useState(1);
    // Estado para armazenar o termo de busca
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para controlar a visibilidade do campo de busca
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    // Estado para controlar o carregamento da página
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const itemsPerPage = 10;
    const totalClients = 50; // número estabelecido para não sobrecarregar a API, tendo em vista que é apenas um cenário de teste

    // Função para buscar os clientes da API
    const fetchClients = async () => {
        try {
            setLoading(true);
            const apiUrl = buildApiUrl(
                'https://public-api2.ploomes.com/Contacts',
                searchTerm
                    ? {
                        // Constrói a url da requisição se houver algum termo de busca
                        $filter: `contains(Name, '${searchTerm}') or contains(Email, '${searchTerm}') or Phones/any(p: contains(p/PhoneNumber, '${searchTerm}'))`,
                    }
                    // Constrói a url da requisição geral de clientes com paginação
                    : { $top: itemsPerPage, $skip: (pageNumber - 1) * itemsPerPage }
            );

            // Realiza uma solicitação GET para obter a lista de clientes
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Key': getUserKey(),
                },
            });

            if (response.ok) {
                // Se a solicitação for bem-sucedida, extrai os dados dos clientes e atualiza o estado
                const data = await response.json();
                setClients(data.value);
            } else {
                // Se houver um erro na busca da lista de clientes, registra no console e exibe uma notificação
                console.error('Erro ao buscar lista de clientes');
                notification.error({
                    message: 'Erro ao buscar clientes!',
                    description: 'Tente novamente mais tarde.',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Erro na requisição à API:', error);
            notification.error({
                message: 'Erro na conexão com a API!',
                description: 'Verifique sua conexão com a internet e tente novamente.',
                duration: 5,
            });
        } finally {
            // Desativando o indicador de carregamento, independentemente do resultado
            setLoading(false);
        }
    };

    // Efeito para buscar clientes sempre que a página ou o termo de busca mudar
    useEffect(() => {
        fetchClients();
    }, [pageNumber, searchTerm]);

    // Função para lidar com a mudança de página
    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    // Função para lidar com a mudança no termo de busca
    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Função para alternar a visibilidade do campo de busca
    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
        // Limpar o termo de busca ao fechar o campo de pesquisa
        setSearchTerm('');
    };

    // Função para lidar com o clique no botão de voltar
    const handleReturn = () => {
        navigate(`/`);
    };

    // Função para exibir o modal de confirmação ao clicar no ícone de deletar um cliente
    const showDeleteModal = (clientId: number) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza de que deseja excluir este cliente?',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    // Realiza uma solicitação DELETE para excluir o cliente
                    const response = await fetch(`https://public-api2.ploomes.com/Contacts(${clientId})`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Key': getCookieUserKey(),
                        },
                    });

                    if (response.ok) {
                        notification.success({
                            message: 'Cliente deletado com sucesso!',
                            duration: 3, // Tempo em segundos que a notificação será exibida
                        });
                        // Atualize a lista após a exclusão
                        fetchClients();
                    } else {
                        // Se houver um erro na exclusão do cliente, registra no console e exibe uma notificação
                        console.error('Erro ao excluir cliente');
                        notification.error({
                            message: 'Erro ao deletar o cliente!',
                            description: 'Tente novamente mais tarde.',
                            duration: 3,
                        });
                    }
                } catch (error) {
                    // Trata erros na requisição à API
                    console.error('Erro na requisição à API:', error);
                    notification.error({
                        message: 'Erro na conexão com a API!',
                        description: 'Verifique sua conexão com a internet e tente novamente.',
                        duration: 5,
                    });
                }
            },
            onCancel: () => { },
        });
    };

    return (
        <div className="container">
            {/* Botão de voltar redireciona para a tela inicial */}
            <Button type="default" onClick={handleReturn}>
                Voltar
            </Button>
            <Card title="Lista de clientes">
                <Row>
                    <Col flex="auto">

                        {/* Link para a página de criação de cliente com botão de adicionar */}
                        <Link to="/clients/create">
                            <Tooltip title="Adicionar cliente">
                                <Button type="primary" icon={<PlusOutlined />} />
                            </Tooltip>
                        </Link>
                    </Col>
                    {/* Campo de busca */}

                    {/* Campo de busca visível apenas quando isSearchVisible for verdadeiro */}
                    {isSearchVisible && (
                        <Col>
                            <Tooltip title="Digite o nome, e-mail ou telefone do cliente">
                                <Input
                                    placeholder="Digite o nome, e-mail ou telefone do cliente"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    style={{ width: 'auto', marginRight: '8px' }}
                                />
                            </Tooltip>
                        </Col>
                    )}

                    {/* Botão de busca com ícone de lupa */}
                    <Tooltip title="Buscar clientes">
                        <Button type="primary" icon={<SearchOutlined />} onClick={toggleSearchVisibility} />
                    </Tooltip>
                </Row>

                {/* Lista de clientes */}
                <Spin spinning={loading}>
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
                </Spin>

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
        </div>
    );
};

export default ClientList;