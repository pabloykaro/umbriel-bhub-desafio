# Project for B Hub
Este projeto é uma solução para o B Hub, com foco em simplificar e automatizar processos de clients empreendedores.


## Requisitos:
- Nodejs 18.14.0 LTS


## Tutorial para instalação:

1) Primeiramente faça o clone do projeto via git.

2) Entre na pasta do projeto que foi clonado e instale as dependências do projeto com "npm install"

- Host da api: http://localhost:3333/ 

## Ambiente Docker: 

1) Utilize o comando "docker-composer up" para subir os bancos de dados de teste e desenvolvimento da aplicação.


### Ambiente de desenvolvimento:

1) Quando os bancos de dados estiverem on-line, utilize o comando "cd prisma" dentro da pasta do projeto no terminal e use o comando "npx prisma migrate dev" para criar tabelas dentro do banco.

2) Utilize o comando "npm run dev" para subir o app em desenvolvimento(localmente).

### Ambiente de testes: 

- Para rodar os testes unitarios rode o seguinte comando: "npm run test:uts"

- Para rodar os testes integração rode o seguinte comando: "npm run test:its"


### Link para documentação da api: 
https://documenter.getpostman.com/view/9041801/2s935uH1GG