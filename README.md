# API de Gestão de Tarefas

Este é um sistema para gerenciar tarefas de um usuário, desenvolvido com Node.js, Express, JWT para autenticação, e um banco de dados PostgreSQL. Ele oferece funcionalidades para criação, leitura, atualização e exclusão de tarefas, além de permitir que o usuário as marque como concluídas.

## Funcionalidades

- **Autenticação de Usuários**: O sistema permite o cadastro e login de usuários com autenticação JWT.
- **Gerenciamento de Tarefas**: O usuário pode criar, listar, atualizar, excluir e concluir tarefas.
- **Documentação da API**: A API é documentada com Swagger, permitindo fácil entendimento das rotas e seus parâmetros.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados de usuários e tarefas.
- **JWT**: Tecnologia para autenticação segura de usuários.
- **Swagger**: Utilizado para gerar a documentação da API.

## Instalação

1. Clonar o repositório

```bash
git clone https://github.com/usuario/gestao-tarefas.git
cd gestao-tarefas
```

2. Instalar as dependências
```
npm install
```
3. Configurar o Banco de Dados
Crie um banco de dados PostgreSQL e configure a conexão no arquivo .env com as seguintes variáveis:
```
PORT = 
DATABASE_URL = 
JWT_SECRET = 
```
4. Rodar as Migrations (se aplicável)
Se você estiver usando migrations, execute o comando para aplicá-las.
```
npm run migrate
```
5. Iniciar o servidor
```
npm start
```
O servidor será iniciado em http://localhost:3000.

Endpoints da API

1. Usuários
POST /usuarios - Registrar um novo usuário
Body:
```
{
  "nome": "Nome do Usuário",
  "email": "email@dominio.com",
  "senha": "senha_segura"
}
```
POST /login - Login de um usuário
```
{
  "email": "email@dominio.com",
  "senha": "senha_segura"
}
```
2. Tarefas
GET /tarefas - Listar todas as tarefas do usuário
```
[
  {
    "id": 1,
    "titulo": "Tarefa 1",
    "descricao": "Descrição da tarefa 1",
    "concluida": false
  },
  {
    "id": 2,
    "titulo": "Tarefa 2",
    "descricao": "Descrição da tarefa 2",
    "concluida": true
  }
]
```
POST /tarefas - Criar uma nova tarefa
Body:
```
{
  "titulo": "Nova Tarefa",
  "descricao": "Descrição da nova tarefa"
}
```
PUT /tarefas/:id - Atualizar uma tarefa existente
Body:
```
{
  "titulo": "Tarefa Atualizada",
  "descricao": "Descrição atualizada",
  "concluida": true
}
```
DELETE /tarefas/:id - Excluir uma tarefa
Resposta:
```
{}
```
PATCH /tarefas/:id/concluir - Concluir uma tarefa
Resposta:
```
{
  "id": 1,
  "titulo": "Tarefa 1",
  "descricao": "Descrição da tarefa 1",
  "concluida": true
}
```
Documentação com Swagger
Para acessar a documentação da API, acesse http://localhost:3000/api-docs.

Contato
Nome: Arthur dos Reis
Email: arthurprojci@gmail.com
