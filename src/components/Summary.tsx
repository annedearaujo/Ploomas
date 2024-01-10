// src/components/Summary.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Summary: React.FC = () => {
    // Lógica para obter a user-key salva nos cookies
    const userKey = Cookies.get('user-key') || '';

    return (
        <div>
            {/* Resumo da aplicação */}
            <div>
                <h2>Ploomas - Gerenciamento de Clientes</h2>
                <p>
                    Bem-vindo ao Ploomas, sua plataforma eficiente para gerenciar clientes utilizando a API pública do Ploomes.
                    Explore as seguintes funcionalidades:
                </p>
                <ul>
                    <li><Link to="/clients">Listagem</Link></li>
                    <li><Link to="/clients/create">Criação</Link></li>
                    <li><Link to="/clients/search">Busca</Link></li>
                </ul>

                <p>Além disso, você pode:</p>
                <ul>
                    <li>Visualizar, Editar e Deletar clientes</li>
                    <li>Ativar o modo escuro</li>
                    <li>Selecionar o responsável pelo cliente</li>
                </ul>

                <p>
                    Para começar, por favor, faça a autenticação usando sua "user-key".
                </p>
                <p>User-Key atual: {userKey}</p>
                <p>Atalhos:</p>
                <ul>
                    <li><Link to="/authentication">Alterar ou adicionar a User-Key</Link></li>
                    {/* Adicionar outros atalhos conforme necessário */}
                </ul>
            </div>
        </div>
    );
};

export default Summary;