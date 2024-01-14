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

- Node.js
- npm

## Dependências do projeto

```json
{
  "@ant-design/compatible": "^5.1.2",
  "@ant-design/icons": "^5.2.6",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "@types/jest": "^27.5.2",
  "@types/node": "^16.18.70",
  "@types/react": "^18.2.47",
  "@types/react-dom": "^18.2.18",
  "antd": "^5.12.8",
  "craco-less": "^3.0.1",
  "js-cookie": "^3.0.5",
  "less": "^4.2.0",
  "less-loader": "^11.1.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "react-scripts": "5.0.1",
  "styled-components": "^6.1.8",
  "web-vitals": "^2.1.4"
}
```

## Configuração do Ambiente

1. Clone este repositório.
2. Navegue até o diretório do projeto no terminal.
3. Execute o comando: `npm install` para instalar as dependências.
4. Crie um arquivo `.env` na raiz do projeto e adicione a chave de autenticação: REACT_APP_USER_KEY=SuaChaveAqui
5. Execute o comando: `npm start` para iniciar o servidor de desenvolvimento. A aplicação estará disponível em http://localhost:3000.

## Configuração da API do Ploomes

1. Crie uma conta de teste em https://www.ploomes.com/versao-trial.
2. Gere um usuário de integração e obtenha a chave de acesso à API pública.
3. Configure a chave de acesso no arquivo .env ou em outro local seguro.

## Funcionalidades:

- [x] A tela inicial da aplicação permite que o usuário adicione manualmente a user-key de autenticação para uso da API pública do Ploomes.
- [x] A user-key de autenticação inserida pelo usuário é persistida nos cookies do navegador e pode ser alterada em uma tela dedicada.
- [x] Ao pressionar a tecla F5 para atualizar a página, o usuário não é desconectado de sua autenticação.
- [x] Existe uma tela de listagem de clientes.
- [x] A tela de listagem de clientes possui infinity scroll ou paginação.
- [x] Listagem dos clientes.
- [x] Visualização dos dados de um dos clientes.
- [x] Edição do cliente.
- [x] Criação de cliente.
- [x] Deleção de cliente.
- [x] Possibilidade de buscar clientes por nome, e-mail ou telefone.
- [x] Permite a mudança temporária do esquema cromático, exibindo a interface gráfica com tonalidades mais escuras.
- [ ] A aplicação segue como padrão a preferência previamente escolhida no sistema operacional do usuário.
- [ ] A última opção selecionada pelo usuário é armazenada em cookies, mantendo a seleção após atualizar a página.
- [ ] Possibilita a seleção do usuário responsável pelo cliente.
- [ ] Permite busca de usuários por nome dentro do campo de responsável.
- [ ] Adiciona o campo de responsável na edição e criação do usuário.
- [ ] Filtro que possibilita apresentar na tela apenas os clientes em que um usuário específico é responsável.
- Configuração de formulário de cliente:
  - [ ] Criação dinâmica de novos campos.
  - [ ] Possibilidade de editar o nome de campos criados dinamicamente.
  - [ ] Tornar o preenchimento de um campo obrigatório.
  - [ ] Editar a ordem que os campos são exibidos no formulário.
  - [ ] Criar blocos que agrupem campos.
  - [ ] Tornar o formulário de cliente dinâmico a partir do formulário configurado.
- Criação de Filtros Personalizados:
  - [ ] Possibilidade de criar filtros mais elaborados.
  - [ ] Utilização de todos os campos pertencentes à entidade de cliente.
  - [ ] Uso de operadores lógicos como AND e OR na construção desses filtros.
  - [ ] Funcionalidade de salvar e editar esses filtros.
  - [ ] Opção de atribuir nomes aos filtros para facilitar identificação e seleção.
- Fórmulas dinâmicas nos campos do cliente:
  - [ ] Configuração de um campo que permita a criação de fórmulas usando JavaScript.
  - [ ] Fórmula sensível a alterações em outros campos, funcionando como um gatilho para recalculá-lo.

## Licença
Este projeto está licenciado sob a Licença Apache 2.0.

## Estrutura do Projeto

### `public/`
- `favicon.ico`
- `index.html`
- `logo_ploomes.png`
- `manifest.json`

### `src/`

- `App.tsx`
- `index.tsx`
- `react-app-env.d.ts`
- `reportWebVitals.ts`
- `setupTests.ts`

#### `components/`
- `ClientDelete.tsx`
- `ClientSearch.tsx`
- `DarkModeSwitch.test.tsx`
- `DarkModeSwitch.tsx`
- `Summary.tsx`
- `UserKeyPopup.tsx`

#### `contexts/`
- `UserKeyContext.tsx`

#### `pages/`
- `AuthenticationPage.tsx`
- `ClientCreate.tsx`
- `ClientDetails.tsx`
- `ClientEdit.tsx`
- `ClientList.tsx`

#### `styles/`
- `styles.css`
- `UserKeyPopup.css`

### `/` (raiz)
- `.env`
- `.gitignore`
- `LICENSE`
- `package-lock.json`
- `package.json`
- `README.md`
- `tsconfig.json`