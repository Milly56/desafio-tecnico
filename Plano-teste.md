<h1 align="center">📋 Plano de Teste - Desafio Técnico QA</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
  <img src="https://img.shields.io/badge/Newman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Newman">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/REQ--01_a_04-API-blue?style=flat-square" alt="API">
  <img src="https://img.shields.io/badge/REQ--05_a_09-Frontend-green?style=flat-square" alt="Frontend">
  <img src="https://img.shields.io/badge/status-conclu%C3%ADdo-success?style=flat-square" alt="Status">
</p>

## 📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Escopo](#2-escopo)
3. [Ambiente de testes](#3-ambiente-de-testes)
4. [Estratégia de teste](#4-estratégia-de-teste)
5. [Casos de teste - API (Pets)](#5-casos-de-teste---api-pets)
6. [Casos de teste - Frontend (Linha do tempo "História")](#6-casos-de-teste---frontend-linha-do-tempo-história)
7. [Critérios de aceite](#7-critérios-de-aceite)
8. [Ferramentas utilizadas](#8-ferramentas-utilizadas)

---

## 1. Objetivo

Este documento descreve o plano de teste para validação de duas frentes do desafio técnico:

| Frente | Descrição |
|---|---|
| 🔌 **API** | Validação das operações básicas de Pets na API pública Swagger Petstore, via Postman/Newman. |
| 🖥️ **Frontend** | Validação da seção "História" do site institucional [Phoebus](https://www.phoebus.com.br/), garantindo que a navegação pela linha do tempo exiba corretamente o ano correspondente ao item clicado, via Playwright. |

## 2. Escopo

### ✅ Dentro do escopo
- Criação, consulta, consulta com erro e exclusão de Pets via API (REQ-01 a REQ-04).
- Navegação até o menu "História" no site.
- Interação com 3 anos diferentes na linha do tempo.
- Validação de que o texto descritivo exibido corresponde ao ano clicado.
- Captura de evidências (prints) e geração de relatório de execução para ambas as frentes.

### ❌ Fora do escopo
- Testes de autenticação/autorização (API pública, sem necessidade de login).
- Testes de carga, performance ou segurança.
- Testes em múltiplos navegadores/dispositivos (execução default do Playwright/Chromium).
- Testes de outras seções do site além da linha do tempo "História".

## 3. Ambiente de testes

| Item | Detalhe |
|---|---|
| 🌐 API sob teste | Swagger Petstore - https://petstore.swagger.io/ |
| 🌐 Frontend sob teste | Site institucional Phoebus - https://www.phoebus.com.br/ - seção "História" |
| 🧰 Ferramenta API | Postman / Newman |
| 📊 Reporter API | newman-reporter-htmlextra |
| 🧰 Ferramenta Frontend | Playwright |
| 📊 Reporter Frontend | HTML Reporter nativo do Playwright |
| 💻 Sistema operacional | Linux |
| 🦊 Navegador | Firefox |

## 4. Estratégia de teste

- **API**: execução via **Collection Runner** do Postman e/ou linha de comando com **Newman**, respeitando a ordem de dependência entre as requests.
- **Frontend**: automação end-to-end com **Playwright**, simulando a navegação de um usuário real pela linha do tempo.
- Evidências (prints) e relatório HTML consolidado são gerados automaticamente a cada execução, em ambas as frentes.

> O detalhamento de passos, pré-condições e resultados esperados de cada verificação está nas seções 5 e 6.

## 5. Casos de teste - API (Pets)

<details open>
<summary><b>REQ-01 - Criação de um novo Pet</b></summary>

| Campo | Detalhe |
|---|---|
| Endpoint | `POST /pet` |
| Pré-condição | Nenhuma |
| Passos | Enviar payload com `id`, `name` e `status` gerados dinamicamente |
| Resultado esperado | Status `200`; corpo de resposta retorna os mesmos valores de `id`, `name` e `status` enviados |
| Pós-condição | `petId`, `petName` e `petStatus` salvos no environment para uso nas próximas requests |

</details>

<details open>
<summary><b>REQ-02 - Busca de um Pet por ID</b></summary>

| Campo | Detalhe |
|---|---|
| Endpoint | `GET /pet/{{petId}}` |
| Pré-condição | Pet criado com sucesso em REQ-01 |
| Passos | Buscar o pet usando o `petId` salvo |
| Resultado esperado | Status `200`; `id`, `name` e `status` retornados são idênticos aos salvos no environment |

</details>

<details open>
<summary><b>REQ-03 - Busca de um ID inexistente</b></summary>

| Campo | Detalhe |
|---|---|
| Endpoint | `GET /pet/{{invalidPetId}}` |
| Pré-condição | Nenhuma |
| Passos | Buscar um `id` que não existe na base |
| Resultado esperado | Status `404`; mensagem de erro contendo `"Pet not found"` |

</details>

<details open>
<summary><b>REQ-04 - Exclusão do Pet criado</b></summary>

| Campo | Detalhe |
|---|---|
| Endpoint | `DELETE /pet/{{petId}}` |
| Pré-condição | Pet criado com sucesso em REQ-01 |
| Passos | Excluir o pet usando o `petId` salvo |
| Resultado esperado | Status `200`; corpo de resposta confirma exclusão do `petId` correspondente |

</details>

## 6. Casos de teste - Frontend (Linha do tempo "História")

<details open>
<summary><b>REQ-05 - Acesso ao menu "História"</b></summary>

| Campo | Detalhe |
|---|---|
| Pré-condição | Site acessível e no ar |
| Passos | Definir viewport 1280x720; acessar a home (`page.goto('/')`); aplicar zoom de 70% via `document.body.style.zoom` para melhor enquadramento do print; tratar banner de cookies (clicar em "Aceitar" se visível); clicar no link "HISTÓRIA" do menu |
| Resultado esperado | Seção exibe o texto "Nossa História" visível no viewport (`toBeInViewport`), confirmando que a navegação ocorreu com sucesso |
| Observação técnica | A URL da página é capturada após a navegação (`urlEsperada`) para servir de base de comparação nos testes seguintes, já que a troca de ano ocorre via SPA/JS, sem navegação real de página |

</details>

<details open>
<summary><b>REQ-06 - Seleção de 3 anos distintos na linha do tempo</b></summary>

| Campo | Detalhe |
|---|---|
| Pré-condição | Seção "História" carregada (REQ-05) |
| Anos testados | `2017`, `2018`, `2021` (executados em testes independentes, um por ano) |
| Passos | Localizar o botão do ano via `[aria-label="{ano}"]`; validar que está visível; rolar até o elemento (`scrollIntoViewIfNeeded`); clicar via `evaluate` (click direto no elemento, contornando possíveis overlays do Wix) |
| Resultado esperado | Cada clique atualiza o conteúdo exibido na tela sem erros e sem navegar para outra URL |
| Validação extra | Confirma que a URL base (sem hash) permanece igual à capturada em REQ-05, garantindo que o clique não disparou navegação para outra página |

</details>

<details open>
<summary><b>REQ-07 - Validação do ano exibido no texto descritivo</b></summary>

| Campo | Detalhe |
|---|---|
| Pré-condição | Ano clicado na linha do tempo (REQ-06) |
| Passos | Localizar o texto do slide ativo via regex `^{ano}\s*-` (garante que o texto começa com o ano seguido de hífen, ex: "2017 - ...") e validar que está visível no viewport |
| Resultado esperado | O slide ativo exibe o texto iniciado pelo mesmo ano que foi clicado no menu, para os 3 anos testados (2017, 2018 e 2021) |

</details>

<details open>
<summary><b>REQ-08 - Evidência em print para cada ano selecionado</b></summary>

| Campo | Detalhe |
|---|---|
| Pré-condição | Validação do ano concluída (REQ-07) |
| Passos | No `afterEach` de cada teste, calcular a área (bounding box) da seção "Nossa História" para recortar o print apenas nessa região (com fallback para uma área fixa em torno do título, caso a seção não seja localizada); nome do arquivo gerado a partir do título do teste, normalizado (sem acentos, minúsculo, com hífens) |
| Resultado esperado | 3 prints gerados (um por ano testado), salvos localmente em `evidencias/{nome-do-teste}-{status}.png` e também anexados ao relatório de execução via `testInfo.attach` |

</details>

<details open>
<summary><b>REQ-09 - Relatório de execução</b></summary>

| Campo | Detalhe |
|---|---|
| Pré-condição | Execução completa da suíte (REQ-05 a REQ-08) |
| Passos | Gerar relatório HTML via HTML Reporter nativo do Playwright ao final da execução |
| Resultado esperado | Relatório disponível contendo o passo a passo de cada teste (via `test.step`), status de execução (passou/falhou) e os prints anexados a cada caso correspondente (via `testInfo.attach`) |

</details>

## 7. Critérios de aceite

- ✅ Todos os casos de teste de API (REQ-01 a REQ-04) executados com sucesso via Newman, com relatório HTML gerado.
- ✅ Todos os casos de teste de Frontend (REQ-05 a REQ-09) executados com sucesso via Playwright, com 3 prints gerados e relatório HTML consolidado.
- ✅ Nenhuma falha bloqueante identificada nos fluxos testados.

## 8. Ferramentas utilizadas

| Ferramenta | Uso |
|---|---|
| 📮 **Postman** e **Newman** | Automação e execução dos testes de API |
| 📊 **newman-reporter-htmlextra** | Geração de relatório HTML dos testes de API |
| 🎭 **Playwright** | Automação dos testes de frontend |
| 📊 **HTML Reporter nativo do Playwright** | Geração de relatório HTML dos testes de frontend, com passo a passo (`test.step`) e prints anexados (`testInfo.attach`) |

<p align="center"><i>Desenvolvido para o Desafio Técnico QA</i></p>