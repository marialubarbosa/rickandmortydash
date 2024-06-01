# Rick and Morty Dash

Este projeto é uma aplicação frontend desenvolvida em Angular que permite listar personagens da série "Rick and Morty". A aplicação utiliza a biblioteca Angular Material para a interface do usuário, e os Subjects do RxJs para gerenciar o estado dos dados. A aplicação também permite buscar personagens pelo nome e favorita-los. Os dados de personagens favoritos são armazenados usando Subjects do RxJs. O projeto inclui testes automatizados com Jasmine.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* Node.js (versão 12 ou superior)
* npm (versão 6 ou superior)
* Angular CLI (versão 16 ou superior)

## Instalação
1. Clone o repositório:
```
git clone https://github.com/marialubarbosa/rickandmortydash.git
cd rickandmortydash
```
2. Instale as dependências do projeto:
 ```
 npm install
 ```
## Executando o projeto
A estrutura principal do projeto é a seguinte:

```
npm start
```
 ## Testes
Para executar os testes unitários com Karma e Jasmine, execute:
```
npm test
```
Os testes estão localizados ao lado de seus respectivos componentes e serviços, com o sufixo .spec.ts.

Para executar os testes em modo de observação, execute:
```
npm run test:watch
```

## Acesso a versão publicada

A versão publicada deste projeto foi executada com Vercel e está disponível em [https://rickandmortydash.vercel.app/](https://rickandmortydash.vercel.app/).



