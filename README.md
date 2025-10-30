# 📌 GITHUBRANKER

![Node Badge](https://img.shields.io/badge/Node.js-16+-green)
![Axios Badge](https://img.shields.io/badge/Axios-API%20Client-blue)
![GitHub API](https://img.shields.io/badge/GitHub-API-black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


Projeto simples em **Node.js** que consome a API do GitHub para listar e ranquear os primeiros **30 usuários por número de seguidores**, utilizando **Axios**.

---

## ✅ Pré-requisitos
- **Node.js** instalado (versão 14 ou superior recomendada)
- **npm** (já vem junto com o Node)
- **Token de acesso pessoal do GitHub** *(opcional, mas recomendado para evitar limites de requisição)*

---

## 🚀 Instalação

### 1️⃣ Clone este repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd GITHUBRANKER
```

### 2️⃣ Instale as dependências

```bash
npm install
```
- Isso instalará o Axios e outras dependências presentes no package.json.

---

## 🔑 Configuração do Token do GitHub (opcional)
Sem o token, o GitHub limita suas requisições a ~60 por hora. Com token, o limite sobe para milhares.

### ✅ Como gerar um token

1. Acesse GitHub → Settings → Developer Settings → Personal Access Tokens

2. Clique em Generate new token

3. Marque permissão: read:user

4. Defina validade e gere o token

5. Guarde seu token em um local seguro

### ✅ Definindo a variável de ambiente

- ✅ Windows (PowerShell/CMD)

```bash
$env:GITHUB_TOKEN="seu_token_aqui"
```

- ✅ Linux/Mac

```bash
export GITHUB_TOKEN=seu_token_aqui
```

---

## ▶ Como Executar
No terminal, dentro da pasta do projeto:

```bash
node ranker.js
```

---

## 🧠 Funcionamento

- Faz uma busca pelos primeiros 30 usuários públicos do GitHub

- Obtém os dados de cada usuário individualmente

- Extrai o número de seguidores (followers)

- Exibe um ranking decrescente

---

## ⚠️ Observações

- Se o token não for configurado, o script ainda funciona, mas com limite reduzido (60 req/h)

- Nunca compartilhe seu token publicamente

- Se aparecer erro 403, pode ser:

1. Token expirado
2. Limite de requisição excedido

---
## 📚 Referências
- [Axios - Documentação Oficial](https://axios-http.com/)
- [Gerenciamento de Tokens no GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Como definir variáveis de ambiente no Linux](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/)
- [Tutorial básico de Node.js](https://nodejs.dev/learn)
- [Como escrever README profissional no GitHub](https://readme.so/)
