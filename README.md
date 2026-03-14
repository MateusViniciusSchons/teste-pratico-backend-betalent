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
git clone https://github.com/MateusViniciusSchons/teste-pratico-backend-betalent.git
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
docker compose up -d
```

### 4. Instalar Dependências e Preparar o Banco
Execute os comandos abaixo para instalar os pacotes, rodar as migrations e os seeders (para popular usuários e gateways iniciais):
```bash
# Instalar dependências
docker compose exec app npm install

# Rodar Migrations e Seeds
docker compose exec app node ace migration:run
docker compose exec app node ace db:seed
```
## Credenciais de Usuário
```
**ADMIN** 
email: admin@betalent.com
senha: mecontrara
```
## 🚦 Rotas da API
Todas as rotas possuem prefixo `/api/v1`
Criei uma collection do postman para testar as rotas mais facilmente. Ela pode ser encontrada na raiz do projeto (mateus_schons.postman_collection.json)
### 🔓 Públicas
* **POST** `/auth/login` - Realizar o login e obter token de acesso.
* **POST** `/transactions` - Realizar uma compra informando múltiplos produtos e dados do cartão.

### 🔒 Privadas (Requer Autenticação)
| Método | Rota | Descrição | Permissão (Roles) |
| :--- | :--- | :--- | :--- |
| **GET** | `/gateways` | Listar todos os gateways. | `ADMIN`, `USER` |
| **PATCH** | `/gateways/:id` | Ativar/desativar ou alterar a prioridade de um gateway. | `ADMIN` |
| **POST** | `/transactions/:id/chargeback` | Realizar o reembolso de uma compra junto ao gateway. | `ADMIN`, `FINANCE` |
| **GET** | `/clients` | Listar todos os clientes. | `ADMIN`, `USER` |
| **GET** | `/clients/:id/transactions` | Detalhes de um cliente específico e suas compras. | `ADMIN`, `USER` |
| **GET** | `/transactions` | Listar todas as compras realizadas. | `ADMIN`, `USER` |
| **GET** | `/transactions/:id` | Detalhes específicos de uma compra. | `ADMIN`, `USER`, |
| **CRUD** | `/products` | Gerenciamento completo de produtos (Criar, Listar, Editar, Excluir). | `ADMIN`, `MANAGER`, `FINANCE` |
| **CRUD** | `/users` | Gerenciamento completo de usuários. | `ADMIN`, `MANAGER` |

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
      "quantity": "number"
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

precisam de header `"Authorization": "Bearer {token}"`
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
  "amount": "number"
}
```

#### Response

```json
{
  "product": {
    "id": "number",
    "name": "string",
    "amount": "number"
  }
}
```

### Listar Produtos

**GET** `/products`

Lista produtos

#### Response

```json
{
  "products": [
  {
    "id": "number",
    "name": "string",
    "amount": "number"
  }]
}
```

### Detalhar Produto

**GET** `/products/:id`

Detalha produto

#### Response

```json
{
  "product": {
    "id": "number",
    "name": "string",
    "amount": "number"
  }
}
```

### Atualizar Produto

**PUT** `/products/:id`

Atualiza um produto

#### Body

```json
{
  "name": "string",
  "amount": "number"
}
```

#### Response

```json
{
  "product": {
    "id": "number",
    "name": "string",
    "amount": "number"
  }
}
```

### Deletar Produto

**DELETE** `/products/:id`

Deleta produto

#### Response

```json
status: 204 (No Content)
```

### Listar Clientes

**GET** `/clients`

Lista clientes

#### Response

```json
{
  "clients": [
  {
    "id": "number",
    "name": "string",
    "email": "string"
  }]
}
```

### Detalhar Cliente E Suas Compras

**GET** `/clients/:id/transactions`

Detalha compras de um cliente

#### Response

```json
{
  "client": {
    "id": "number",
    "name": "string",
    "email": "string"
    "transactions": [{
      "id": "number",
      "amount": "number",
      "cardLastNumbers": "string",
      "clientId": "number",
      "externalId": "string",
      "gatewayId": "number",
      "status": "string",
      "products": [{
        "id": "number",
        "productId": "number",
        "transactionId": "number",
        "quantity": "number",
        "product": {
          "id": "number",
          "name": "string",
          "amount": "number",
          "deleted": "boolean",
        }
      }]
    }]
  }
}
```

### Listar Compras

**GET** `/transactions`

Lista compras

#### Response

```json
{
  "transactions": [{
      "id": "number",
      "amount": "number",
      "cardLastNumbers": "string",
      "clientId": "number",
      "externalId": "string",
      "gatewayId": "number",
      "status": "string",
      "client": {
        "id": "number",
        "name": "string",
      },

  }]
}
```

### Detalhar uma Compra

**GET** `/transactions/:id`

Detalha compra

#### Response

```json
{
  "transaction": {
      "id": "number",
      "amount": "number",
      "cardLastNumbers": "string",
      "clientId": "number",
      "externalId": "string",
      "gatewayId": "number",
      "status": "string",
      "client": {
        "id": "number",
        "name": "string"
      },
      "products": [{
        "id": "number",
        "productId": "number",
        "transactionId": "number",
        "quantity": "number",
        "unitPrice": "number",
        "product": {
          "id": "number",
          "name": "string",
          "amount": "number",
        }
      }]
}
```

### Estornar uma Compra

**POST** `/transactions/:id/chargeback`

Estorna uma compra

#### Response

```json
{
  "message": "string",
  "transaction": {
    "id": "number",
    "amount": "number",
    "cardLastNumbers": "string",
    "clientId": "number",
    "externalId": "string",
    "gatewayId": "number",
    "status": "string",
    "gateway": {
      "id": "number",
      "name": "string",
      "isActive": "boolean",
      "priority": "number"
    }
  }
}
```

### Listar Gateways

**GET** `/gateways`

Lista gateways

#### Response

```json
{
  "gateways": [{
       "id": "number",
      "name": "string",
      "isActive": "boolean",
      "priority": "number"
  }]
}
```

### Atualizar Parcialmente um Gateway

**PATCH** `/gateways/:id`

Atualiza parcialmente um gateway

#### Body

```json
{
  "isActive"?: "boolean",
  "priority"?: "number"
}
```

#### Response

```json
{
  "gateway": {
    "id": "number",
    "name": "string",
    "isActive": "boolean",
    "priority": "number"
  }
}
```

## 🧪 Testes Automatizados (TDD)

### Rodando os Testes
Para executar a suíte de testes completa dentro do container Docker, utilize:

```bash
docker compose exec app node ace test
```

## 📈 Extras
- Adicionei unitPrice à tabela transactionProducts para salvar o preço unitário do produto no momento da compra, caso o produto mude de valor no futuro, mantendo dados para calcular possíveis estornos de apenas um produto ou consulta de mudança de preços, caso necessário.
- Planejei uma refatoração no Transaction Model, mas não tive tempo de implementar.
