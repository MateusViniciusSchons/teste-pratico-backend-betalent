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
git clone [https://github.com/](https://github.com/)[seu-usuario]/[nome-do-repo].git
cd [nome-do-repo]
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

### 💳 Pagamentos (Checkout)
**POST** `/checkout`
Realiza a compra processando o pagamento através da lógica de multi-gateway.
- **Payload:**
```json
{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ],
  "card": {
    "name": "Nome do Titular",
    "number": "5569000000006063",
    "cvv": "010",
    "expiry": "12/28"
  }
}
```

## 🧪 Testes Automatizados (TDD)

O projeto foi desenvolvido seguindo os princípios de **TDD (Test Driven Development)**, garantindo que as regras de negócio, como a alternância entre gateways (fallback) e as permissões de acesso (RBAC), estejam protegidas contra regressões.

### Rodando os Testes
Para executar a suíte de testes completa dentro do container Docker, utilize:

```bash
docker-compose exec app node ace test
```
