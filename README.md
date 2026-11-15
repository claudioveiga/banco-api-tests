# Banco API Tests

## Objetivo

O **Banco API Tests** é um projeto de automação de testes para validação da API REST do projeto Banco API. A suíte de testes foi desenvolvida em JavaScript e tem como objetivo validar regras de negócio, contratos de API, códigos de resposta HTTP e comportamentos esperados dos serviços disponibilizados pela aplicação.

Projeto da API testada:
- https://github.com/claudioveiga/banco-api

Repositório de testes:
- https://github.com/claudioveiga/banco-api-tests

## Stack Utilizada

- Node.js
- JavaScript
- Mocha (framework de testes)
- Chai (assertions)
- Supertest (requisições HTTP)
- Mochawesome (relatórios HTML)
- Dotenv (gerenciamento de variáveis de ambiente)

## Pré-requisitos

- Node.js instalado
- NPM instalado
- API Banco API em execução

## Configuração do Ambiente

### Instalação das dependências

```bash
npm install
```

### Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=http://localhost:3000
```

Onde:

- `BASE_URL`: URL base da API REST a ser testada.

## Estrutura de Diretórios

```text
banco-api-tests/
├── test/
│   ├── login.test.js
│   ├── transferencias.test.js 
│   └── ...
├── mochawesome/
├── package.json
├── package-lock.json
├── .env
└── .gitignore
```

### Diretórios principais

| Diretório | Descrição |
|-----------|-----------|
| test | Contém os cenários e suítes de testes automatizados |
| mochawesome | Relatórios HTML gerados após a execução dos testes |

## Execução dos Testes

### Executar todos os testes

```bash
npm test
```

Caso o projeto possua scripts específicos definidos no `package.json`, utilize-os conforme configurados.

## Geração de Relatórios

O projeto utiliza o **Mochawesome** para geração de relatórios HTML.

Após a execução dos testes, os relatórios serão gerados no diretório:

```text
mochawesome/
```

Para visualizar o relatório:

1. Execute os testes.
2. Acesse o diretório `mochawesome`.
3. Abra o arquivo HTML gerado em qualquer navegador.

## Boas Práticas

- Mantenha a API em execução antes de iniciar os testes.
- Configure corretamente a variável `BASE_URL`.
- Não versione arquivos sensíveis contendo credenciais.
- Utilize relatórios para análise de falhas e evidências de execução.

## Dependências e Documentação

### Node.js
https://nodejs.org

### Mocha
https://mochajs.org

### Chai
https://www.chaijs.com

### Supertest
https://github.com/ladjs/supertest

### Mochawesome
https://github.com/adamgruber/mochawesome

### Dotenv
https://github.com/motdotla/dotenv

## Integração com a API Banco

A API utilizada nos testes está disponível em:

https://github.com/claudioveiga/banco-api

Consulte a documentação da API para conhecer os endpoints, regras de negócio e configurações necessárias para execução completa da suíte de testes.
