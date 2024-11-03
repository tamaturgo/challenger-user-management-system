# User Management System

Um sistema de gerenciamento de usuários que permite a adição, edição, e visualização de usuários. A aplicação possui autenticação e autorização, e permite a visualização de dados sobre os usuários cadastrados.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pr%C3%A9-requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
- [Uso](#uso)

## Tecnologias Utilizadas

- **Frontend:** ReactJS, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeScript
- **Banco de Dados:** PostgreSQL
- **Docker:** Para a containerização da aplicação
- **D3.js:** Para visualização de dados

## Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- Docker e Docker Compose
- Node.js (para desenvolvimento e execução do frontend)
- [NPM](https://www.npmjs.com/get-npm) (geralmente instalado com o Node.js)

## Estrutura do Projeto

    user-management-system/

        │
        ├── backend/                  # Código do backend
        │   ├── src/                  # Código-fonte da aplicação
        │   ├── Dockerfile             # Dockerfile para o backend
        │   └── package.json           # Dependências do backend
        │
        ├── frontend/                 # Código do frontend
        │   ├── src/                  # Código-fonte da aplicação
        │   ├── Dockerfile             # Dockerfile para o frontend
        │   └── package.json           # Dependências do frontend
        │
        └── docker-compose.yml        # Configuração do Docker Compose

## Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/tamaturgo/challenger-user-management-system.git
    ```

2.  **Inicie o Docker Compose:**

    ```bash
    cd challenger-user-management-system
    docker-compose up -d --build
    ```

3.  **Acesse a aplicação:** 
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- Banco de Dados: Conecte-se ao PostgreSQL na porta 5432 com o usuário e senha definidos no docker-compose.yml (usuário: postgres, senha: password).

## Uso

### Primeiro acesso:

Ao acessar a aplicação pela primeira vez, você será redirecionado para a tela de login. Para acessar a aplicação, utilize as seguintes credenciais:

- email: admin@example.com 
- senha: admin

### Funcionalidades:

A aplicação possui as seguintes funcionalidades:

- **Listagem de Usuários:** Visualize todos os usuários cadastrados
- **Adicionar Usuário:** Adicione um novo usuário
- **Editar Usuário:** Edite as informações de um usuário
- **Visualização de Dados:** Visualize dados sobre os usuários cadastrados

Usuários do tipo "admin" podem adicionar, editar, e visualizar usuários. Usuários do tipo "user" podem abrir uma tela de boa-vindas. Quando usuários do tipo "user" tentam acessar a listagem de usuários, eles são redirecionados para uma tela de erro de autorização.

Apenas usuários ativos podem acessar a aplicação. Usuários inativos não tem o login permitido. Para desativar um usuário, basta clicar no botão "Excluir" na listagem de usuários. E para ativar novamente, edite o usuário e salve as alterações.
