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

## ✅ Requisitos cobertos

| ID | Frente | Descrição |
|---|---|---|
| REQ-01 | API | Criação de um novo Pet com `id`, `name` e `status` |
| REQ-02 | API | Busca de um Pet por `id`, validando se os dados batem com o que foi criado |
| REQ-03 | API | Busca de um `id` inexistente, validando a mensagem de erro |
| REQ-04 | API | Exclusão do Pet criado |
| REQ-05 | Web | Acesso ao site e navegação até o menu "HISTÓRIA" |
| REQ-06 | Web | Seleção de 3 anos diferentes na linha do tempo (2017, 2018, 2021) |
| REQ-07 | Web | Validação de que o ano exibido no texto descritivo é o mesmo ano clicado |
| REQ-08 | Web | Captura automática de print para cada um dos 3 anos selecionados |
| REQ-09 | Web | Geração de relatório de execução com passo a passo e prints anexados |

> Detalhes de cada caso (pré-condições, passos e resultado esperado) estão no [`Plano-teste.md`](./Plano-teste.md).

## 🛠️ Como executar

1. **Clonar o repositório e acessar a pasta**
    ```bash
    git clone git@github.com:Milly56/desafio-tecnico.git
    cd desafio-tecnico
    ```

2. **API** (Postman/Newman) — respeitar a ordem REQ-01 → REQ-02 → REQ-03 → REQ-04, pois REQ-02 e REQ-04 dependem do `petId` gerado no REQ-01
    - Via Postman: importar `Api/Desafio-QA.postman_collection.json` e `Api/env.postman_environment.json`, selecionar o environment `env` e rodar pelo **Collection Runner**
    - Via linha de comando:
      ```bash
      cd Api
      newman run Desafio-QA.postman_collection.json -e env.postman_environment.json -r htmlextra --reporter-htmlextra-export docs/report.html
      ```
    > ℹ️ A API [Swagger Petstore](https://petstore.swagger.io/) é pública e de demonstração — não é necessário autenticação para executar as requisições.

3. **Web** (Playwright)
    ```bash
    cd Web
    npm install
    npx playwright test
    npx playwright show-report
    ```
    Os prints de cada execução ficam salvos em `Web/evidencias/`, e o relatório completo (com passo a passo e prints anexados) é gerado em `Web/playwright-report/`.

### 📑 Relatórios publicados

Os relatórios de execução (`Api/docs/report.html` e `Web/docs/index.html`) foram publicados no **GitHub Pages**:

- 🔗 Relatório da API: `https://milly56.github.io/desafio-tecnico/Api/docs/report.html`
- 🔗 Relatório do Frontend: `https://milly56.github.io/desafio-tecnico/Web/docs/index.html`

## 🧠 Como funciona a automação de Frontend

- Define viewport `1280x720` e aplica zoom de 70% na página para melhor enquadramento dos prints
- Trata o banner de cookies, se aparecer
- Navega até o menu "HISTÓRIA" e confirma que a seção "Nossa História" está visível
- Para cada ano (`2017`, `2018`, `2021`):
  - Localiza o botão do ano via `[aria-label="{ano}"]`
  - Clica no ano (via `evaluate`, contornando possíveis overlays do Wix)
  - Confirma que o clique não navegou para outra URL (comportamento de SPA)
  - Valida que o slide ativo exibe o texto iniciado pelo ano clicado
  - Captura um print da seção "Nossa História" e anexa ao relatório de execução

## 🧰 Tecnologias utilizadas

| Ferramenta | Uso |
|---|---|
| Postman / Newman | Automação e execução dos testes de API |
| newman-reporter-htmlextra | Geração de relatório HTML dos testes de API |
| Playwright | Automação dos testes de frontend |
| HTML Reporter nativo do Playwright | Relatório HTML com passo a passo (`test.step`) e prints anexados (`testInfo.attach`) |

## 📄 Documentação

O plano de teste completo, cobrindo as duas frentes (API e Frontend) com casos de teste, critérios de aceite e ferramentas utilizadas, está disponível em [`Plano-teste.md`](./Plano-teste.md).

## 👥 Autora

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
  <i>Desenvolvido para o Desafio Técnico QA</i>
</p>