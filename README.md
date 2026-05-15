# HelpDesk TI

Sistema web de gerenciamento de chamados de suporte técnico para pequenas e médias organizações com equipe interna de TI. A plataforma centraliza o ciclo completo de atendimento, garantindo rastreabilidade total das alterações, controle de acesso baseado em perfis e geração de indicadores que apoiam a tomada de decisão.

## Integrantes do grupo

- **Gabriel Marmentini** — Equipamentos, Dashboard e Relatórios
- **Luize Zatti** — Chamados, Comentários, Participantes e Histórico
- **Thauane Amadigi** — Autenticação, Usuários e Categorias

## Tecnologias utilizadas

- **Backend:** Node.js, Express, Sequelize, JWT, bcryptjs
- **Frontend:** React, Vite, React Router, Axios
- **Banco de dados:** PostgreSQL
- **Ícones:** lucide-react

---

## 1. Projeto de Backend

O backend foi desenvolvido com **Node.js + Express** e segue uma estrutura de pastas organizada por responsabilidade (controllers, middlewares, models, routes). A conexão com o PostgreSQL é gerenciada pelo **Sequelize**.

### Estrutura de pastas

```
backend/
└── src/
    ├── config/         # configuração do Sequelize e conexão com o banco
    ├── controllers/    # lógica de negócio (auth, usuarios, chamados, categorias)
    ├── middlewares/    # autenticação JWT e controle de permissões por perfil
    ├── migrations/     # migrations do banco com a estrutura completa das tabelas
    ├── models/         # modelos do Sequelize
    ├── routes/         # definição das rotas da API
    ├── scripts/        # scripts utilitários (ex: atualizarSenhas.js)
    └── server.js       # ponto de entrada do backend
```

### Sistema de autenticação

A autenticação é feita por **JWT (JSON Web Token)**:

1. O usuário envia email e senha pra `POST /api/auth/login`
2. O backend valida a senha com **bcryptjs**
3. Se válida, retorna um token JWT contendo o ID e o perfil do usuário
4. O cliente envia esse token em todas as requisições subsequentes via header `Authorization: Bearer <token>`
5. O middleware `authMiddleware` valida o token a cada requisição protegida

### Sistema de permissões

Foram implementados **três perfis de acesso**: `admin`, `tecnico` e `solicitante`. O middleware `permissaoMiddleware` recebe a lista de perfis autorizados e retorna 403 caso o usuário logado não tenha permissão.

Exemplo de uso nas rotas:

```javascript
router.post('/usuarios', authMiddleware, permissaoMiddleware(['admin']), criar);
```

### CRUD completo com autenticação

Dois CRUDs completos estão implementados e protegidos por autenticação:

- **CRUD de Usuários** (`/api/usuarios`) — restrito ao perfil admin
- **CRUD de Chamados** (`/api/chamados`) — disponível para usuários autenticados

### Endpoints disponíveis

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/api/auth/login` | Autentica e retorna token JWT | Público |
| GET | `/api/usuarios` | Lista usuários | Admin |
| GET | `/api/usuarios/:id` | Busca usuário por ID | Admin |
| POST | `/api/usuarios` | Cria usuário | Admin |
| PUT | `/api/usuarios/:id` | Atualiza usuário | Admin |
| DELETE | `/api/usuarios/:id` | Inativa usuário | Admin |
| GET | `/api/chamados` | Lista chamados | Autenticado |
| GET | `/api/chamados/:id` | Busca chamado por ID | Autenticado |
| POST | `/api/chamados` | Cria chamado | Autenticado |
| PUT | `/api/chamados/:id` | Atualiza chamado | Autenticado |
| DELETE | `/api/chamados/:id` | Exclui chamado | Autenticado |
| GET | `/api/categorias` | Lista categorias ativas | Autenticado |

---

## 2. Projeto de Frontend

O frontend foi desenvolvido com **React + Vite** e segue uma estrutura de pastas organizada por responsabilidade.

### Estrutura de pastas

```
frontend/
└── src/
    ├── components/     # componentes reutilizáveis (Layout, PrivateRoute)
    ├── contexts/       # AuthContext (estado global de autenticação)
    ├── pages/          # telas (Login, ListaChamados, NovoChamado, NaoEncontrada)
    ├── routes/         # configuração das rotas com proteção
    ├── services/       # comunicação com a API (api, authService, chamadoService, etc.)
    ├── App.jsx
    └── main.jsx
```

### Tela de login integrada com o backend

A tela `/login` consome o endpoint `POST /api/auth/login`. Após autenticação:

- O token JWT é salvo no `localStorage`
- O usuário é redirecionado pra `/chamados`
- O Axios é configurado por interceptor pra enviar o token em todas as requisições seguintes

### Sistema de rotas com proteção por permissão

A proteção de rotas é feita pelo componente **`PrivateRoute`**, que verifica se o usuário está autenticado e, opcionalmente, se tem o perfil necessário para acessar a rota:

```jsx
<Route path="/chamados" element={
  <PrivateRoute>
    <ListaChamados />
  </PrivateRoute>
} />
```

Se o usuário não estiver autenticado, é redirecionado pra `/login`. Se não tiver o perfil autorizado, é redirecionado pra `/chamados`. Rotas inexistentes exibem a página **NaoEncontrada** (404).

O menu lateral do `Layout` também é filtrado dinamicamente pelo perfil do usuário logado.

### Tela de CRUD integrada com a API

A tela de **Lista de Chamados** (`/chamados`) e **Novo Chamado** (`/chamados/novo`) consomem a API `/api/chamados`, enviando o token JWT automaticamente. A listagem permite busca e filtragem; o formulário consome também `/api/categorias` e `/api/usuarios` pra preencher dropdowns.

---

## 3. Banco de Dados

A estrutura do banco é definida por **migrations do Sequelize**, garantindo versionamento e reprodutibilidade. As migrations contemplam todas as entidades previstas na proposta do projeto:

| Migration | Tabela | Descrição |
|---|---|---|
| `create-usuarios` | `usuarios` | Usuários do sistema com campo de perfil (admin, tecnico, solicitante) e situação |
| `create-categorias` | `categorias` | Categorias de chamado |
| `create-equipamentos` | `equipamentos` | Equipamentos vinculáveis a chamados |
| `create-chamados` | `chamados` | Chamados de suporte com status, prioridade, categoria e responsável |
| `create-comentarios` | `comentarios` | Comentários trocados em cada chamado |
| `create-participantes` | `participantes` | Usuários adicionais incluídos em chamados |
| `create-historico` | `historico` | Log imutável de auditoria das alterações |

A tabela `usuarios` possui o campo `perfil` (do tipo enum), que substitui a necessidade de uma tabela separada de perfis, atendendo ao critério de "perfis de permissão" de forma simplificada e eficiente.

---

## 4. Como configurar e rodar o projeto localmente

### Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL 14 ou superior
- Git

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/Luize-Zatti/helpdesk-ti.git
cd helpdesk-ti
```

### Passo 2 — Criar o banco de dados

No PostgreSQL (via pgAdmin ou terminal):

```sql
CREATE DATABASE helpdesk_ti;
```

### Passo 3 — Configurar o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=helpdesk_ti
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_DIALECT=postgres
JWT_SECRET=defina_uma_chave_secreta_aleatoria_aqui
JWT_EXPIRES_IN=8h
```

Rode as migrations pra criar todas as tabelas:

```bash
npx sequelize-cli db:migrate
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3001`.

### Passo 4 — Configurar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

### Passo 5 — Inserir dados de teste

Pra testar o sistema, insira categorias e usuários de exemplo no banco:

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

Em seguida, rode o script que converte as senhas em hash bcrypt:

```bash
cd backend
node src/scripts/atualizarSenhas.js
```

Após executar o script, todos os usuários inseridos têm senha **`123456`** (armazenada de forma segura via hash bcrypt).

### Usuários de teste para validação

| Email | Senha | Perfil |
|---|---|---|
| admin@helpdesk.com | 123456 | Administrador |
| carlos@empresa.com | 123456 | Técnico |
| maria@empresa.com | 123456 | Solicitante |

---