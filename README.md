# HelpDesk TI

Sistema web de gerenciamento de chamados de suporte técnico desenvolvido como projeto acadêmico.

## Integrantes e Módulos

- **Gabriel Marmentini** — Equipamentos, Dashboard e Relatórios
- **Luize Zatti** — Chamados, Comentários, Participantes e Histórico
- **Thauane Amadigi** — Autenticação, Usuários e Categorias

## Tecnologias

- **Backend:** Node.js, Express, Sequelize
- **Frontend:** React, Vite, React Router, Axios
- **Banco de dados:** PostgreSQL
- **Ícones:** lucide-react

## Pré-requisitos
- Node.js 18 ou superior
- PostgreSQL 14 ou superior
- Git

## Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Luize-Zatti/helpdesk-ti.git
cd helpdesk-ti
```

### 2. Criar o banco de dados

Acesse o PostgreSQL (via pgAdmin ou terminal) e crie o banco:

```sql
CREATE DATABASE helpdesk_ti;
```

### 3. Configurar e rodar o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=helpdesk_ti
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_DIALECT=postgres
```

Rode as migrations pra criar as tabelas:

```bash
npx sequelize-cli db:migrate
```

Inicie o servidor:

```bash
npm run dev
```

O backend ficará disponível em `http://localhost:3001`.

### 4. Configurar e rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

## Dados de exemplo

Pra inserir categorias e usuários de teste, rode no banco:

```sql
INSERT INTO categorias (nome, descricao, ativo, created_at, updated_at) VALUES
  ('Hardware', 'Problemas com equipamentos físicos', true, NOW(), NOW()),
  ('Software', 'Problemas com softwares e aplicativos', true, NOW(), NOW()),
  ('Rede', 'Problemas de conexão e infraestrutura', true, NOW(), NOW()),
  ('Acesso', 'Solicitações de permissão e contas', true, NOW(), NOW());

INSERT INTO usuarios (nome, email, senha, perfil, ativo, created_at, updated_at) VALUES
  ('Admin Sistema', 'admin@helpdesk.com', 'temp', 'admin', true, NOW(), NOW()),
  ('Carlos Tech', 'carlos@empresa.com', 'temp', 'tecnico', true, NOW(), NOW()),
  ('Maria Santos', 'maria@empresa.com', 'temp', 'solicitante', true, NOW(), NOW());
```

## Endpoints da API

### Chamados (CRUD completo)
- `GET /api/chamados` — listar
- `GET /api/chamados/:id` — buscar por ID
- `POST /api/chamados` — criar
- `PUT /api/chamados/:id` — atualizar
- `DELETE /api/chamados/:id` — excluir

### Consultas auxiliares
- `GET /api/categorias` — listar categorias ativas
- `GET /api/usuarios` — listar usuários ativos

## Telas implementadas

- **Lista de Chamados** (`/chamados`) — listagem com busca e filtros
- **Novo Chamado** (`/chamados/novo`) — formulário de abertura