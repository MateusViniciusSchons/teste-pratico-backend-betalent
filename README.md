# BeTalent - API de Pagamentos Multi-Gateway - Mateus Schons

Esta é uma API RESTful para gerenciamento de pagamentos multi-gateway. Caso o primeiro gateway falhe, o sistema tenta realizar o pagamento automaticamente com o próximo disponível, garantindo uma experiência sem erros para o usuário final.

Este projeto foi desenvolvido como parte do teste prático para a **BeTalent Tech**.

## 🛠 Tecnologias e Ferramentas
- **Framework:** AdonisJS
- **Banco de Dados:** MySQL
- **ORM:** Lucid ORM
- **Containerização:** Docker
- **Testes:** Japa
- **Validação:** VineJS

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- Docker e Docker Compose instalados.
- Um cliente HTTP (Postman, Insomnia, etc.).

### 1. Clonar o Repositório
```bash
git clone [[https://github.com/](https://github.com/)[seu-usuario]/[nome-do-repo].git](https://github.com/MateusViniciusSchons/teste-pratico-backend-betalent.git)
cd teste-pratico-backend-betalent
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e verifique as credenciais do banco de dados e as URLs dos gateways:
```bash
cp .env.example .env
```

### 3. Subir Containers
Este comando iniciará quatro containers: a API Adonis, o MySQL e os dois Mocks de Gateway:
```bash
docker-compose up -d
```

### 4. Instalar Dependências e Preparar o Banco
Execute os comandos abaixo para instalar os pacotes, rodar as migrations e os seeders (para popular usuários e gateways iniciais):
```bash
# Instalar dependências
docker-compose exec app npm install

# Rodar Migrations e Seeds
docker-compose exec app node ace migration:run
docker-compose exec app node ace db:seed
```

Aqui está o bloco de código Markdown contendo apenas a seção de rotas, estruturado para o Nível 3 do desafio:

Markdown

## 🚦 Rotas da API
Todas as rotas possuem prefixo `/api/v1`
### 🔓 Públicas
* **POST** `/login` - Realizar o login e obter token de acesso.
* **POST** `/checkout` - Realizar uma compra informando múltiplos produtos e dados do cartão.

### 🔒 Privadas (Requer Autenticação)
| Método | Rota | Descrição | Permissão (Roles) |
| :--- | :--- | :--- | :--- |
| **PATCH** | `/gateways/:id` | Ativar/desativar ou alterar a prioridade de um gateway. | `ADMIN` |
| **POST** | `/transactions/:id/refund` | Realizar o reembolso de uma compra junto ao gateway. | `FINANCE`, `ADMIN` |
| **GET** | `/clients` | Listar todos os clientes. | `MANAGER`, `ADMIN` |
| **GET** | `/clients/:id` | Detalhes de um cliente específico e suas compras. | `MANAGER`, `ADMIN` |
| **GET** | `/transactions` | Listar todas as compras realizadas. | `USER`, `FINANCE`, `MANAGER`, `ADMIN` |
| **GET** | `/transactions/:id` | Detalhes específicos de uma compra. | `USER`, `FINANCE`, `MANAGER`, `ADMIN` |
| **CRUD** | `/products` | Gerenciamento completo de produtos (Criar, Listar, Editar, Excluir). | `MANAGER`, `ADMIN` |
| **CRUD** | `/users` | Gerenciamento completo de usuários. | `ADMIN` |

## 🛣️ Detalhamento das Rotas
Com prefixo `/api/v1`.

### Login

**POST** `/auth/login`

Autentica um usuário no sistema.

#### Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "user": {
    "id": "number"
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

### Realizar uma Compra

**POST** `/transactions`

Realiza uma compra criando um usuário, caso ele ainda não exista.

#### Body

```json
{
  "clientName": "string",
  "clientEmail": "string",
  "products": [
    {
      "id": "number",
      "quantity": "20000" // Valor em centavos
    }
  ],
  "cardNumber": "string",
  "cvv": "string"
}
```

#### Response

```json
{
  "message": "string",
  "transaction": {
    "id": "number",
    "externalId": "number",
    "gatewayId": "number",
    "status": "string",
    "amount": "number", // Em centavos
    "cardLastNumbers": "string",
    "clientId": "number"
  },
  "token": "string"
}
```

### Rotas Autenticadas
```markdown

prescisam de header `"Authorization": "Bearer {token}"`
```

### Criar Usuário

**POST** `/users`

Cria um usuário

#### Body

```json
{
  "email": "string",
  "password": "string",
  "role": "string"
}
```

#### Response

```json
{
  "user": {
    "id": "number",
    "email": "string",
    "role": "string"
  }
}
```

### Listar Usuários

**GET** `/users`

Lista usuários

#### Response

```json
{
  "users": [
  {
    "id": "number",
    "email": "string",
    "role": "string"
  }]
}
```

### Detalhar Usuário

**GET** `/users/:id`

Detalha usuário

#### Response

```json
{
  "user": {
    "id": "number",
    "email": "string",
    "role": "string"
  }
}
```

### Atualizar Usuário

**PUT** `/users/:id`

Atualiza um usuário

#### Body

```json
{
  "email": "string",
  "password": "string",
  "role": "string"
}
```

#### Response

```json
{
  "user": {
    "id": "number",
    "email": "string",
    "role": "string"
  }
}
```

### Deletar Usuário

**DELETE** `/users/:id`

Deleta usuário

#### Response

```json
status: 204 (No Content)
```

### Criar Produto

**POST** `/products`

Cria um produto

#### Body

```json
{
  "name": "string",
  "amount": "number",
}
```

#### Response

```json
{
  "product": {
    "id": "number",
    "email": "string",
    "amount": "number"
  }
}
```

### Listar Produtos

### Detalhar Produto

### Atualizar Produto

### Deletar Produto

### Listar Clientes

### Detalhar Cliente E Suas Compras

### Listar Compras

### Detalhar uma Compra

### Estornar uma Compra

### Listar Gateways

### Atualizar Parcialmente um Gateway



## 🧪 Testes Automatizados (TDD)

### Rodando os Testes
Para executar a suíte de testes completa dentro do container Docker, utilize:

```bash
docker-compose exec app node ace test
```
