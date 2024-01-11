import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import Cookies from 'js-cookie';
import '../styles/styles.css';
import UserKeyPopup from './UserKeyPopup';

const { Meta } = Card;

const Summary: React.FC = () => {
    const userKey = Cookies.get('user-key') || '';

    return (
        <div className="container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Ploomas - Gerenciamento de Clientes">
                        <p>
                            Bem-vindo ao Ploomas, sua plataforma eficiente para gerenciar clientes utilizando a API pública do Ploomes.
                            Explore as seguintes funcionalidades:
                        </p>
                        <ul>
                            <li><Link to="/clients">Ver lista completa</Link></li>
                            <li><Link to="/clients/create">Cadastrar um cliente</Link></li>
                        </ul>

                        <p>Além disso, você pode:</p>
                        <ul>
                            <li>Pesquisar, visualizar, editar e deletar clientes</li>
                            <li>Ativar o modo escuro</li>
                            <li>Selecionar o responsável pelo cliente</li>
                        </ul>

                        <p>
                            Para começar, por favor, faça a autenticação usando sua "user-key".
                        </p>
                        <UserKeyPopup />
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Atalhos" extra={<Link to="/authentication">Alterar ou adicionar a User-Key</Link>}>
                        <p>User-Key atual: {userKey}</p>
                        <p>Atalhos:</p>
                        <ul>
                            {/* Adicionar outros atalhos conforme necessário */}
                        </ul>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Summary;