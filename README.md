# API de Lista de Tarefas com Nest e Typescript ✨
Esta é uma API desenvolvida com NestJS e TypeScript que implementa uma lista de tarefas (To-Do List) com autenticação JWT e chave de acesso. O projeto segue a arquitetura MVC (Model-View-Controller), promovendo a separação de responsabilidades e facilitando a manutenção e escalabilidade do código.

## Funcionalidades da API
A API de Lista de Tarefas permite aos usuários gerenciar suas tarefas de forma eficiente e segura. As principais funcionalidades incluem:
 - CRUD de Tarefas: Permite criar, ler, atualizar e excluir tarefas.
 - Autenticação JWT: Protege as rotas da API utilizando JSON Web Tokens (JWT) para garantir que apenas usuários autenticados possam acessar e modificar dados.
 - Chave de Acesso: Requer uma chave de acesso específica para interagir com a API, aumentando a segurança.
 - Gestão de Usuários: Registra, autentica, lista, edita e deleta um usuário.
## Tecnologias Utilizadas
 - NodeJs
 - Typescript
 - NestJS
 - TypeORM
 - MySQL
 - Token JWT
 - Swagger
## Regras de Uso
Para usar a API de Lista de Tarefas, siga os passos abaixo:

 1. Clone este repositório:

```bash
git clone https://github.com/italomsilva/nest-to-do-list.git
```
2. Instale as dependências:

```bash
cd nest-to-do-list
npm install
```
3. Configure as variáveis de ambiente:
 - Crie um arquivo .env na raiz do projeto
 - Adicione as variáveis
```bash
APP_PORT= 3000 #(Fica a sua escolha)
DB_HOST= localhost #(seu host)
DB_PORT=3306 #(porta padrão)
DB_USER=root #(seu usuário)
DB_PASSWORD= 123456 #(sua senha)
DB_NAME=testtodo
APIKEY_VALUE=v-apikey
JWT_SECRET=SECURITY=SECURITY #(Fica a sua escolha)
```
4. Crie o banco de dados
 - Execute o arquivo src/database/template/create.sql para criar as tabelas necessárias

5. Inicie a aplicação:
```bash
npm run start
```
 6. Acesse a API
 - A API estará disponível em http://localhost:3000.
Utilize ferramentas como Postman ou Insomnia para interagir com a API.
 - Em toda requisição adicione dois headers: um com o nome 'to-do-apikey' e valor 'v-apikey', e outro chamado 'auth-token' e adicione o valor do token que você receberá ao se registrar ou fazer login.

## Documentação da API
A documentação da API está disponível através do Swagger no endpoint `/documentation/swagger`. Esta documentação fornece uma visão detalhada dos endpoints disponíveis, bem como dos parâmetros e respostas esperados.

Exemplo: Se tiver configurado `APP_PORT=3000`, para acessar a documentação, inicie o servidor e navegue até: `http://localhost:3000/documentation/swagger`. Se não, basta substituir `3000` da url pelo valor de `APP_PORT`. 

## Endpoints
 - GET /user/find-all: Retorna uma lista de todos os usuários.
 - POST /user/sign-up: Registra um novo usuário.
 - POST /user/sign-in: Autentica um usuário.
 - PUT /user/edit-user: Edita um usuário.
 - DELETE /user/delete-user: Deleta um usuário.
 - GET /task/find-all: Retorna uma lista de todas as tarefas de um usuário.
 - POST /task/create: Cria uma tarefa.
 - PUT /task/edit: Edita uma tarefa.
 - PATCH /task/toggle-completed: Altera o estado dde uma tarefa entre completa ou não.
 - DELETE /task/delete: Deleta uma tarefa.
## Licença
Este projeto está licenciado sob a Licença MIT.




<p align="center">
 <h1>Nest</h1>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
