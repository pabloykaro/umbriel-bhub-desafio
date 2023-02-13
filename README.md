case-umbriel-bhub
Project for B Hub

Este projeto é uma solução para o B Hub, com foco em simplificar e automatizar processos de clients empreendedores.

Tutorial para instalação:

Primeiramente faça o clone do projeto via git.

Docker: Rode o comando docker run build -t umbriel:v1 .

Apos ter criado a imagem do docker rode o comando "docker-composer up" para subir o app e os bancos de dados da aplicação.

Ambiente de testes: Para rodar os testes unitarios rode o seguinte comando: npm run test:uts

Para rodar os testes integração rode o seguinte comando: npm run test:its

Ambiente de desenvolvimento: Comando npm install para instalar as dependências.

Comando npm run dev para subir o app em desenvolvimento.

Link para documentação da api: https://documenter.getpostman.com/view/9041801/2s935uH1GG