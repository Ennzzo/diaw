# Front-end - AlugaCar (React + Vite) 🚗

## 📖 Descrição

Interface web do sistema de aluguel de carros. Feita com **React 19 + Vite**, **React Router**, **Axios** e CSS puro (um arquivo por tela/componente em `src/css`). Consome a API Spring Boot da pasta [`Back`](../Back).

## 📁 Organização das pastas

```
laboratorio02/
├── Back/    # API Spring Boot
└── Front/   # este projeto
```

## ✅ Pré-requisitos

- Node.js 20+
- Back-end configurado (ver [README do Back](../Back/README.md))

## 🚀 Rodando os dois projetos ao mesmo tempo

### Opção 1: dois terminais

```bash
# terminal 1
cd Back && ./mvnw spring-boot:run

# terminal 2
cd Front && npm install && npm run dev
```

### Opção 2: um terminal só, com o `concurrently` ⭐

```bash
cd Front
npm install
npm run dev:all          # macOS / Linux
npm run dev:all:windows  # Windows
```

Acesse `http://localhost:5173`.

## 🔌 Como o front se conecta ao back

1. **Endereço da API:** `src/config/apiConfig.js`. Sem configurar nada usa `http://localhost:8080`; em produção usa a variável `VITE_API_URL`.
2. **Requisições:** `src/services/api.js` cria o Axios, coloca o token JWT em todas as chamadas e, se a API responder 401, volta para o login.
3. **Erros:** a função `mensagemDeErro` mostra na tela o campo `mensagem` que o `GlobalExceptionHandler` do back devolve.
4. **Login:** `src/context/AuthContext.jsx` guarda o usuário e o token. `RotaPrivada` bloqueia as telas para quem não está logado ou não tem o perfil certo.

## 📂 Estrutura

```
src/
├── components/   # Navbar, Layout, Modal, ClienteForm, StatusBadge, RotaPrivada
├── config/       # apiConfig.js
├── context/      # AuthContext (login)
├── css/          # estilos
├── pages/        # Login, Cadastro, MeusPedidos, PedidoForm, PainelAgente, Clientes, Automoveis
├── services/     # api.js (axios)
└── utils/        # formatar datas e dinheiro
```

## ☁️ Deploy na Vercel

Faça primeiro o deploy do back no Render (ver [README do Back](../Back/README.md#️-deploy-no-render)).

1. Na [Vercel](https://vercel.com), **Add New > Project** e importe o repositório `diaw`.
2. Em **Root Directory** escolha `laboratorio02/Front`. O framework (Vite) é detectado sozinho.
3. Em **Environment Variables** cadastre `VITE_API_URL` com a URL do Render, sem barra no final.
4. Clique em **Deploy**.

O `vercel.json` redireciona todas as rotas para o `index.html`, então dá para recarregar a página em `/painel` ou `/pedidos` sem erro 404. O back já libera `https://*.vercel.app` no CORS.

## 🛠️ Problemas comuns

| Problema | Solução |
|---|---|
| "Nao foi possivel falar com o back-end" | O back está desligado, a `VITE_API_URL` está errada ou o Render ainda está acordando. |
| Mudei a `VITE_API_URL` e nada mudou | O valor entra no build: faça um novo deploy na Vercel. |
| Erro de CORS | Confira o `CORS_ORIGINS` no Render. |

## 🧪 Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | sobe só o front |
| `npm run dev:all` | sobe back e front juntos |
| `npm run build` | gera a versão de produção em `dist/` |
| `npm run lint` | roda o oxlint |
