# Mind-Back

API RESTful para uma plataforma social de posts e comentários, desenvolvida com Node.js, Express e TypeScript.

## Tecnologias

- **Runtime:** Node.js com TypeScript
- **Framework:** Express.js v5
- **Banco de Dados:** MySQL 8.0
- **ORM:** Drizzle ORM
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** Zod
- **Documentação:** Swagger/OpenAPI

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação e listagem de posts com paginação e busca
- Sistema de comentários em posts
- Upload de imagens em Base64
- Documentação interativa da API

## Estrutura do Projeto

```
src/
├── core/                    # Camada de negócio
│   ├── entities/            # Entidades do domínio
│   └── use-case/            # Casos de uso
├── http/                    # Camada HTTP
│   ├── controllers/         # Controladores
│   ├── middlewares/         # Middlewares
│   ├── routes/              # Rotas
│   └── schemas/             # Schemas de validação
├── infra/                   # Infraestrutura
│   └── schemas/             # Schemas do banco de dados
└── utils/                   # Utilitários
```

## Pré-requisitos

- Node.js 18+
- pnpm
- Docker e Docker Compose

## Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd mind-back
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:
```env
DATABASE_HOST=localhost
DATABASE_USER=docker
DATABASE_PASSWORD=docker
DATABASE_NAME=articles_db
DATABASE_URL=mysql://docker:docker@localhost:3306/articles_db
JWT_SECRET=sua-chave-secreta
APP_PORT=3333
```

5. Inicie o banco de dados:
```bash
docker-compose up -d
```

6. Execute as migrations:
```bash
pnpm run migrate
```

7. (Opcional) Popule o banco com dados de exemplo:
```bash
pnpm run seed
```

## Executando

**Desenvolvimento:**
```bash
pnpm run dev
```

**Produção:**
```bash
pnpm run build
pnpm start
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia o servidor em modo desenvolvimento |
| `build` | Compila o TypeScript |
| `start` | Executa a versão compilada |
| `generate` | Gera arquivos de migration |
| `migrate` | Executa migrations pendentes |
| `studio` | Abre o Drizzle Studio |
| `seed` | Popula o banco com dados de exemplo |

## Endpoints da API

A documentação completa está disponível em `/docs` após iniciar o servidor.

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/signin` | Login do usuário |

### Usuários

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/users` | Criar usuário | Não |
| PUT | `/users/:id` | Atualizar usuário | Não |
| GET | `/users/profile` | Perfil do usuário | Sim |

### Posts

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/posts` | Listar posts (paginado) | Não |
| POST | `/posts/create` | Criar post | Sim |

## Autenticação

A API utiliza JWT para autenticação. Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu-token>
```

O token é obtido através do endpoint `/signin` e expira em 1 dia.

## Banco de Dados

### Tabelas

**users**
- `id` - Identificador único (ULID)
- `name` - Nome do usuário
- `email` - Email (único)
- `password` - Senha (hash)
- `created_at` - Data de criação
- `updated_at` - Data de atualização

**posts**
- `id` - Identificador único (ULID)
- `title` - Título do post
- `content` - Conteúdo
- `description` - Descrição
- `author_id` - ID do autor (FK)
- `image_url` - URL da imagem
- `like_count` - Contador de likes
- `created_at` - Data de criação
- `updated_at` - Data de atualização

**comments**
- `id` - Identificador único (ULID)
- `content` - Conteúdo do comentário
- `author_id` - ID do autor (FK)
- `post_id` - ID do post (FK)
- `like_count` - Contador de likes
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## Backup do Banco de Dados

### Criar dump

```bash
docker exec mind-back-mysql mysqldump -u docker -pdocker --no-tablespaces articles_db > dump.sql
```

### Restaurar dump

```bash
docker exec -i mind-back-mysql mysql -u docker -pdocker articles_db < dump.sql
```

### Opções úteis

```bash
# Apenas estrutura (sem dados)
docker exec mind-back-mysql mysqldump -u docker -pdocker --no-tablespaces --no-data articles_db > schema.sql

# Apenas dados (sem estrutura)
docker exec mind-back-mysql mysqldump -u docker -pdocker --no-tablespaces --no-create-info articles_db > data.sql
```

## Licença

Este projeto está sob a licença MIT.
