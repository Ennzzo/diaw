# Back-end - AlugaCar (Spring Boot + Supabase) ☕

## 📖 Descrição

API REST do sistema de aluguel de carros, feita com **Java 25**, **Spring Boot 4.0.9** e **Maven**, seguindo a arquitetura **MVC**. Os dados ficam no **Supabase (PostgreSQL)** e o acesso é protegido com **Spring Security + JWT**.

## 📦 Pacotes e responsabilidades

### ⚙️ config
`SecurityConfig` (rotas liberadas e permissões por perfil), `CorsConfig` + `CorsProperties` (quem pode chamar a API) e `DadosIniciais` (cria os agentes `locadora` e `banco`).

### 🔐 security
`JwtService` gera e valida o token. `JwtFilter` lê o cabeçalho `Authorization: Bearer ...` em cada requisição. `UsuarioDetailsService` carrega o usuário e os perfis (`CLIENTE`, `AGENTE`, `BANCO`).

### 🎮 controller
Recebe as requisições HTTP: `AuthController`, `ClienteController`, `AutomovelController`, `PedidoController`, `ContratoController` e `StatusController`.

### 🧠 service
Regras de negócio: limite de 3 rendimentos, CPF e login únicos, datas do pedido, quem pode alterar/cancelar, avaliação, contrato e crédito.

### 🧩 model
Entidades JPA: `Usuario` (abstrata), `Cliente`, `Agente`, `Rendimento`, `Automovel`, `Pedido`, `Contrato` e `ContratoCredito`.

### 🗄️ repository
Interfaces do Spring Data JPA.

### 📨 dto
Objetos de entrada (`Request`) e saída (`Response`) da API.

### 🚨 exception
`GlobalExceptionHandler` transforma qualquer erro em um JSON padrão (`ErroResposta`):

```json
{
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "A data de fim nao pode ser antes da data de inicio",
  "caminho": "/api/pedidos",
  "timestamp": "2026-11-04T18:44:16"
}
```

## 🌐 Endpoints

| Método | Rota | Quem pode |
|---|---|---|
| GET | `/` e `/api/status` | público |
| POST | `/api/auth/cadastro` | público |
| POST | `/api/auth/login` | público |
| GET | `/api/auth/me` | logado |
| GET/POST/PUT/DELETE | `/api/clientes` | agente |
| GET | `/api/automoveis` | logado |
| POST/PUT/DELETE | `/api/automoveis` | agente |
| GET | `/api/pedidos` | cliente (os seus) / agente (todos) |
| POST | `/api/pedidos` | cliente |
| PUT | `/api/pedidos/{id}` | cliente (o seu) / agente |
| PATCH | `/api/pedidos/{id}/cancelar` | cliente |
| PATCH | `/api/pedidos/{id}/avaliar` | agente |
| POST | `/api/pedidos/{id}/contrato` | agente |
| POST | `/api/pedidos/{id}/credito` | banco |

Exemplos prontos para testar estão no arquivo [`requests.http`](requests.http).

```bash
curl http://localhost:8080/api/status
# {"api":"online","banco":"online"}
```

## 🐘 Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) (região South America - São Paulo) e guarde a senha do banco.
2. Clique em **Connect** > **JDBC** > **Session pooler** (porta 5432). Não use a *Direct connection*, que só funciona com IPv6.
3. Copie o `.env.example` para `.env` e preencha:

```properties
DB_URL=jdbc:postgresql://aws-1-sa-east-1.pooler.supabase.com:5432/postgres
DB_USER=postgres.SEU_PROJETO
DB_PASSWORD=SUA_SENHA
JWT_SECRET=uma-chave-com-pelo-menos-32-caracteres
CORS_ORIGINS=http://localhost:5173,https://*.vercel.app
```

As tabelas são criadas sozinhas pelo Hibernate (`ddl-auto=update`) na primeira execução. O `.env` está no `.gitignore` e nunca deve ir para o GitHub.

## 🔓 CORS

O front roda em outra origem (`localhost:5173` ou `*.vercel.app`), então o navegador só deixa ele chamar a API se ela liberar essa origem. As origens ficam em `app.cors.allowed-origins` (variável `CORS_ORIGINS`), separadas por vírgula e sem barra no final.

## 🚀 Como rodar

```bash
./mvnw spring-boot:run        # macOS / Linux
mvnw.cmd spring-boot:run      # Windows
```

A API sobe em `http://localhost:8080`. Para subir back e front juntos, veja o `npm run dev:all` no [README do Front](../Front/README.md).

## 🧪 Testes

```bash
./mvnw test
```

Testes de model, service (Mockito) e controller (MockMvc em modo standalone, sem subir o Spring nem o banco). Eles também rodam no GitHub Actions a cada push.

## 🐳 Docker

O [`Dockerfile`](Dockerfile) tem duas etapas: a primeira compila com Maven + JDK 25 e a segunda roda o `.jar` só com o JRE 25, deixando a imagem menor.

```bash
docker build -t aluguel-api .
docker run -p 8080:8080 --env-file .env aluguel-api
```

## ☁️ Deploy no Render

1. No [Render](https://render.com), clique em **New > Blueprint**, escolha o repositório `diaw` e informe `laboratorio02/render.yaml` em **Blueprint Path**.
   (Ou **New > Web Service**, runtime **Docker**, *Root Directory* `laboratorio02/Back`.)
2. Preencha as variáveis `DB_URL`, `DB_USER` e `DB_PASSWORD` com os dados do Supabase. O `JWT_SECRET` é gerado pelo Render.
3. Depois do deploy, abra `https://SEU-SERVICO.onrender.com/api/status` e confira se aparece `"banco":"online"`.

O plano gratuito "dorme" depois de 15 minutos sem uso, então a primeira requisição pode demorar cerca de 1 minuto.

## 🛠️ Problemas comuns

| Problema | Solução |
|---|---|
| `"banco":"offline"` ou erro 503 | Confira `DB_URL`, `DB_USER` e `DB_PASSWORD`. Use o *Session pooler*. |
| Erro de CORS no console do navegador | Adicione a URL do front em `CORS_ORIGINS` (sem barra no final). |
| 401 em tudo | Faça login de novo; o token expira em 8 horas. |
| 403 | O perfil logado não tem permissão para aquela rota. |
