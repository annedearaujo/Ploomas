import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Space } from 'antd';
import Cookies from 'js-cookie';
import '../styles/styles.css';
import UserKeyPopup from './UserKeyPopup';
import { BulbOutlined, EditOutlined, FileSearchOutlined, SearchOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Summary: React.FC = () => {
    const userKey = Cookies.get('user-key') ?? '';

    return (
        <>
            <div className="container"  >
                <Card title="Ploomas - Gerenciamento de Clientes" bordered={false} >
                    <>
                        <>
                            <p>
                                Bem-vindo ao Ploomas, sua plataforma eficiente para gerenciar clientes utilizando a API pública do Ploomes.
                                Explore as seguintes funcionalidades:
                            </p>
                            <ul>
                                <li><Link to="/clients">Ver lista completa.</Link></li>
                                <li><Link to="/clients/create">Cadastrar um cliente.</Link></li>
                            </ul>

                            <p>Além disso, você pode:</p>
                            <ul>
                                <li>Pesquisar, visualizar, editar e deletar clientes.</li>
                                <li>Ativar o modo escuro.</li>
                            </ul>

                            <p>
                                Clique no botão abaixo para mudar sua chave de autenticação.
                            </p>
                            <UserKeyPopup />
                        </>
                    </>

                    <>
                        <Card type="inner" title="Instruções gerais" >
                            <p> Aqui estão algumas dicas úteis para tirar o máximo proveito da aplicação:
                            </p>
                            <ol>
                                <li>Certifique-se de ter sua chave de autenticação ("User-Key") pronta para acessar os recursos completos da API do Ploomes.</li>
                                <li>Explore as funcionalidades na seção de clientes:</li>
                                <ul>
                                    <li>
                                        <UnorderedListOutlined /> Para ver a lista completa de clientes, clique em "Ver lista completa".</li>
                                    <li>
                                        <UserAddOutlined /> Para cadastrar um novo cliente, clique em "Cadastrar um cliente".</li>
                                    <li>
                                        <SearchOutlined /> Pesquise diretamente na tela de clientes pelo ícone de lupa.</li>
                                    <li>
                                        <FileSearchOutlined /> Ao pesquisar, você poderá utilizar filtros por nome, e-mail ou telefone.</li>
                                    <li>
                                        <EditOutlined /> Edite ou delete clientes diretamente a partir da lista ou clique sobre o cliente para ver seus detalhes, também podendo editar e deletar o cliente a partir dessa tela.</li>
                                    <li>
                                        <BulbOutlined /> Experimente ativar o modo escuro para uma experiência visual diferente.</li>
                                </ul>
                                <li>Lembre-se de manter sua chave de autenticação segura. Caso necessário, você pode alterá-la a qualquer momento no botão de "User-Key" disponível no resumo ou canto inferior esquerdo em todas as telas.</li>
                                <li>Se tiver dúvidas ou precisar de mais informações, consulte a documentação disponível no menu principal.</li>
                            </ol>
                        </Card>
                    </>
                </Card>
            </div>
        </ >
    );
};

export default Summary;