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
                <h2>Ploomas</h2>
                <p> Por aqui, você pode gerenciar os clientes Ploomas do Ploomes de forma eficiente. Aqui estão alguns recursos que você pode explorar:
                </p>
                <ul>
                    <li>Listagem</li>
                    <li>Edição</li>
                    <li>Criação</li>
                    <li>Deleção</li>
                    <li>Busca por Nome, E-mail ou Telefone</li>
                </ul>

                <p>
                    Para começar, por favor, faça a autenticação usando sua "user-key".
                </p>
                <p>User-Key atual: {userKey}</p>
                <p>Atalhos:</p>
                <ul>
                    <li><Link to="/authentication">Clique aqui para alterar ou adicionar a uk</Link></li>
                    {/* Adicionar outros atalhos */}
                </ul>
            </div>
        </div>
    );
};

export default Summary;
