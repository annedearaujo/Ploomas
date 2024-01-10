# Ploomas

## Descrição do Projeto

O projeto consiste em uma aplicação para gerenciamento de clientes utilizando a API pública do Ploomes. A aplicação foi desenvolvida em React com TypeScript, utilizando a Context API para o gerenciamento de estado. O design da interface foi construído com base no Ant Design, e a navegação é feita com o React Router Dom.

## Tecnologias e Ferramentas

### Frontend:
- **React com Context API**: Biblioteca para construir interfaces de usuário interativas.
- **TypeScript**: Superset de JavaScript para adicionar tipagem estática ao código React.
- **Ant Design**: Biblioteca de Design System para React, fornecendo componentes visuais prontos para uso.
- **Styled Components**: Biblioteca para estilização de componentes em React.

### Documentação e Desenvolvimento:
- **Git e GitHub**: Sistema de controle de versão e plataforma para hospedar projetos.
- **README.md**: Documentação que descreve o projeto e explica como executá-lo.
- **VS Code**: Ambiente de desenvolvimento integrado (IDE).

### Testes:
- **Jest**: Estrutura de teste para JavaScript/TypeScript.

### Comunicação com API:
- **Postman**: Plataforma para testar APIs, permitindo enviar requisições HTTP e visualizar respostas.

### Navegação:
- **React Router Dom**: Biblioteca para gerenciamento de rotas em aplicações React, permitindo a navegação entre diferentes componentes.

### Persistência de Dados:
- **Cookies**: Uma forma de armazenar pequenas informações no navegador do usuário, útil para persistir a chave de autenticação neste projeto.


## Requisitos Técnicos

- Node.js (versão X.X.X)
- npm (versão X.X.X)

## Configuração do Ambiente

1. Clone este repositório.
2. Navegue até o diretório do projeto no terminal.
3. Execute o comando: `npm install` para instalar as dependências.
    - `npm install react-router-dom`;
    - `npm install antd`;
    - `npm install styled-components`;
    - `npm install js-cookie`.
4. Crie um arquivo `.env` na raiz do projeto e adicione a chave de autenticação: REACT_APP_USER_KEY=SuaChaveAqui
5. Execute o comando: `npm start` para iniciar o servidor de desenvolvimento. A aplicação estará disponível em http://localhost:3000.

## Configuração da API do Ploomes

1. Crie uma conta de teste em https://www.ploomes.com/versao-trial.
2. Gere um usuário de integração e obtenha a chave de acesso à API pública.
3. Configure a chave de acesso no arquivo .env ou em outro local seguro.

## Funcionalidades:

- [ ] A tela inicial da aplicação permite que o usuário adicione manualmente a user-key de autenticação para uso da API pública do Ploomes.
- [ ] A user-key de autenticação inserida pelo usuário é persistida nos cookies do navegador e pode ser alterada em uma tela dedicada.
- [ ] Ao pressionar a tecla F5 para atualizar a página, o usuário não é desconectado de sua autenticação.
- [ ] Existe uma tela de listagem de clientes.
- [ ] A tela de listagem de clientes possui infinity scroll ou paginação.
- [ ] Listagem dos clientes.
- [ ] Visualização dos dados de um dos clientes.
- [ ] Edição do cliente.
- [ ] Criação de cliente.
- [ ] Deleção de cliente.
- [ ] Possibilidade de buscar clientes por nome, e-mail ou telefone.
- [ ] Permite a mudança temporária do esquema cromático, exibindo a interface gráfica com tonalidades mais escuras.
- [ ] A aplicação segue como padrão a preferência previamente escolhida no sistema operacional do usuário.
- [ ] A última opção selecionada pelo usuário é armazenada em cookies, mantendo a seleção após atualizar a página.
- [ ] Possibilita a seleção do usuário responsável pelo cliente.
- [ ] Permite busca de usuários por nome dentro do campo de responsável.
- [ ] Adiciona o campo de responsável na edição e criação do usuário.
- [ ] Filtro que possibilita apresentar na tela apenas os clientes em que um usuário específico é responsável.

## Testes

A aplicação inclui testes unitários para garantir a estabilidade do código. Execute os testes com o seguinte comando:

## Licença
Este projeto está licenciado sob a Licença Apache 2.0.

## Estrutura
src/
├── components/
│   ├── UserKeyPopup.tsx
│   └── Summary.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   └── AuthenticationPage.tsx
├── App.tsx
└── ...
