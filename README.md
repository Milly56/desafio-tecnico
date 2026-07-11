<h1 align="center">🐾 Desafio Técnico - QA (API + Frontend)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
  <img src="https://img.shields.io/badge/Newman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Newman">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
</p>

Desafio técnico de QA cobrindo duas frentes de automação de testes: validação de uma **API** de gestão de Pet Shops (Postman/Newman) e validação da seção **"História"** do site institucional Phoebus (Playwright).

## 🎯 Contexto

O projeto está dividido em duas partes independentes:

1. **Api** - a equipe de desenvolvimento está construindo o backend de um sistema de gestão de Pet Shops. A API já está publicada em ambiente de **staging** ([Swagger Petstore](https://petstore.swagger.io/)), e esta frente cobre a validação das operações básicas de **Pets**.
2. **Web** - o time está validando a seção "História" do site institucional [Phoebus](https://www.phoebus.com.br/), garantindo que os usuários possam navegar pela linha do tempo e que o ano exibido esteja sempre correto.

## 📁 Estrutura do projeto

```
├── Api/                                  # Testes de API (Postman/Newman)
│   ├── docs/
│   │   └── report.html                   # Relatório HTML gerado pelo Newman
│   ├── Desafio-QA.postman_collection.json
│   └── env.postman_environment.json
│
├── Web/                                  # Testes de Frontend (Playwright)
│   ├── docs/
│   │   ├── data/
│   │   └── index.html                    # Relatório HTML gerado pelo Playwright
│   ├── evidencias/                       # Prints gerados pelos testes
│   ├── playwright-report/
│   ├── test-results/
│   ├── tests/                            # Specs de teste
│   ├── playwright.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── Plano-teste.md                        # Plano de teste único (API + Frontend)
└── README.md
```

## 🛠️ Passo a Passo

1.  **Clonar o repositório**
    ```bash
    git clone git@github.com:Milly56/desafio-tecnico.git
    ```

2.  **Acessar o diretório**
    ```bash
    cd desafio-tecnico
    ```

### ▶️ Rodando os testes de API

3.  **Abrir o Postman e importar os arquivos da collection**
    ```
    Api/Desafio-QA.postman_collection.json
    Api/env.postman_environment.json
    ```

4.  **Selecionar o environment `env` e executar a collection**

    Via **Collection Runner**, respeitando a ordem: REQ-01 → REQ-02 → REQ-03 → REQ-04

    Ou via linha de comando, com o Newman:
    ```bash
    cd Api
    newman run Desafio-QA.postman_collection.json -e env.postman_environment.json -r htmlextra --reporter-htmlextra-export docs/report.html
    ```

### ▶️ Rodando os testes de Frontend

5.  **Acessar o diretório `Web`**
    ```bash
    cd Web
    ```

6.  **Instalar as dependências**
    ```bash
    npm install
    ```

7.  **Executar os testes**
    ```bash
    npx playwright test
    ```

8.  **Visualizar o relatório gerado**
    ```bash
    npx playwright show-report
    ```

### 📑 Relatórios publicados

Os relatórios de execução (`Api/docs/report.html` e `Web/docs/index.html`) foram publicados no **GitHub Pages**:

- 🔗 Relatório da API: `https://milly56.github.io/desafio-tecnico/Api/docs/report.html`
- 🔗 Relatório do Frontend: `https://milly56.github.io/desafio-tecnico/Web/docs/index.html`

## 🔌 Api - Testes de Pet Shop

Validação das operações básicas de Pets na API pública Swagger Petstore.

### Requisitos cobertos

| ID | Descrição |
|---|---|
| REQ-01 | Criação de um novo Pet com `id`, `name` e `status` |
| REQ-02 | Busca de um Pet por `id`, validando se os dados batem com o que foi criado |
| REQ-03 | Busca de um `id` inexistente, validando a mensagem de erro |
| REQ-04 | Exclusão do Pet criado |

### Requests da collection

1. **REQ-01 - Add a new pet to the store** (`POST /pet`) — cria o pet e salva `petId`, `petName` e `petStatus` no environment
2. **REQ-02 - Find pet by ID** (`GET /pet/{{petId}}`) — busca o pet criado e valida se os dados retornados batem com os salvos
3. **REQ-03 - Find pet by invalid ID (error)** (`GET /pet/{{invalidPetId}}`) — busca um id inexistente e valida a mensagem de erro `"Pet not found"`
4. **REQ-04 - Deletes a pet** (`DELETE /pet/{{petId}}`) — exclui o pet criado no REQ-01

### Como executar

1. Abra o Postman
2. Importe `Api/Desafio-QA.postman_collection.json`
3. Importe `Api/env.postman_environment.json`
4. Selecione o environment **env**
5. Execute a collection via **Collection Runner**, respeitando a ordem: REQ-01 → REQ-02 → REQ-03 → REQ-04 (REQ-02 e REQ-04 dependem do `petId` gerado no REQ-01)

> ℹ️ A API [Swagger Petstore](https://petstore.swagger.io/) é pública e de demonstração — não é necessário autenticação (login/token) para executar as requisições.

### Tecnologias utilizadas

- **Postman / Newman** - automação e testes de API
- **newman-reporter-htmlextra** - geração de relatório HTML

## 🖥️ Web - Testes da Linha do Tempo (Phoebus)

Automação de teste frontend para validar a seção "História" do site [phoebus.com.br](https://www.phoebus.com.br/), garantindo que o ano exibido no texto descritivo corresponde ao ano clicado na linha do tempo.

### Requisitos cobertos

| ID | Descrição |
|---|---|
| REQ-05 | Acesso ao site e navegação até o menu "HISTÓRIA" |
| REQ-06 | Seleção de 3 anos diferentes na linha do tempo (2017, 2018, 2021) |
| REQ-07 | Validação de que o ano exibido no texto descritivo é o mesmo ano clicado |
| REQ-08 | Captura automática de print para cada um dos 3 anos selecionados |
| REQ-09 | Geração de relatório de execução com passo a passo e prints anexados |

### Como funciona a automação

- Define viewport `1280x720` e aplica zoom de 70% na página para melhor enquadramento dos prints
- Trata o banner de cookies, se aparecer
- Navega até o menu "HISTÓRIA" e confirma que a seção "Nossa História" está visível
- Para cada ano (`2017`, `2018`, `2021`):
  - Localiza o botão do ano via `[aria-label="{ano}"]`
  - Clica no ano (via `evaluate`, contornando possíveis overlays do Wix)
  - Confirma que o clique não navegou para outra URL (comportamento de SPA)
  - Valida que o slide ativo exibe o texto iniciado pelo ano clicado
  - Captura um print da seção "Nossa História" e anexa ao relatório de execução

### Como executar

1. Acesse a pasta `Web`
2. Instale as dependências: `npm install`
3. Execute os testes: `npx playwright test`
4. Visualize o relatório gerado: `npx playwright show-report`

Os prints de cada execução ficam salvos em `Web/evidencias/`, e o relatório HTML completo (com passo a passo e prints anexados) é gerado em `Web/playwright-report/`.

### Tecnologias utilizadas

- **Playwright** - automação dos testes de frontend
- **HTML Reporter nativo do Playwright** - geração de relatório HTML com passo a passo (`test.step`) e prints anexados (`testInfo.attach`)

## 📄 Documentação

O plano de teste completo, cobrindo as duas frentes (API e Frontend) com casos de teste, critérios de aceite e ferramentas utilizadas, está disponível em [`Plano-teste.md`](./Plano-teste.md).

## 👥 Contribuidores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/Milly56">
        <img src="https://avatars.githubusercontent.com/u/149894875?v=4" width="100px;" alt="Jamily Alves Rodrigues"/><br />
        <sub><b>Jamily Alves</b></sub>
      </a>
    </td>
  </tr>
</table>

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<p align="center">
  <i>Desenvolvido para fins acadêmicos</i>
</p>