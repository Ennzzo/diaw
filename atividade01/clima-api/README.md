# 🌦️ Clima API

API REST desenvolvida em **Java + Spring Boot** que consulta e disponibiliza informações meteorológicas de **Belo Horizonte - MG**, consumindo a API pública [Open-Meteo](https://open-meteo.com/).

> Atividade 01 — API REST de Clima com Spring Boot (Pair Programming)

## 👥 Integrantes

- [Nome 1]
- [Nome 2]

## 🌐 API externa utilizada

Foi utilizada a **Open-Meteo**, pois é gratuita, não exige cadastro nem API Key para os endpoints utilizados neste projeto (`/v1/forecast` e o serviço de geocoding), o que simplifica a configuração e evita exposição de credenciais.

- Documentação: https://open-meteo.com/en/docs

## 🔑 Configuração de API Key

Este projeto **não exige API Key**, pois a Open-Meteo é gratuita para o uso feito aqui.

Caso deseje adaptar o projeto para outra API (OpenWeather, WeatherAPI, Tomorrow.io, etc.), adicione a chave em `src/main/resources/application.properties`:

```properties
clima.api.key=SUA_CHAVE_AQUI
```

e leia o valor no service através de:

```java
@Value("${clima.api.key}")
private String apiKey;
```

**Nunca** publique uma API Key real diretamente no código-fonte ou em repositórios públicos. Prefira `application.properties` (fora do controle de versão, via `.gitignore`) ou variáveis de ambiente.

## 🧩 Estrutura do projeto

```
src/
└── main/
    ├── java/com/puc/clima/
    │   ├── ClimaApiApplication.java     # classe principal
    │   ├── controller/
    │   │   └── ClimaController.java     # endpoints REST
    │   ├── service/
    │   │   └── ClimaService.java        # regra de negócio e consumo da API externa
    │   ├── dto/                         # objetos de transferência de dados
    │   ├── exception/                   # exceções customizadas e handler global
    │   ├── util/
    │   │   └── WeatherCodeMapper.java   # traduz códigos WMO em descrições
    │   └── config/
    │       └── RestTemplateConfig.java  # configuração do cliente HTTP
    └── resources/
        └── application.properties
```

## ▶️ Como executar localmente

### Pré-requisitos

- Java 17+
- Maven 3.8+ (ou use o `./mvnw` incluso, se adicionado)

### Passos

```bash
# 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd clima-api

# 2. Rodar a aplicação
mvn spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

### Build/empacotamento (opcional)

```bash
mvn clean package
java -jar target/clima-api-1.0.0.jar
```

## 📦 Dependências principais

| Dependência                        | Finalidade                                  |
|-------------------------------------|----------------------------------------------|
| `spring-boot-starter-web`           | Criação da API REST (Controllers, Jackson)   |
| `spring-boot-starter-validation`    | Validação de parâmetros de requisição        |
| `spring-boot-starter-test`          | Testes unitários (JUnit 5)                   |

## 🚀 Endpoints disponíveis

### 1. Clima atual de Belo Horizonte (obrigatório)

```
GET /clima
GET /clima/belo-horizonte
```

**Exemplo de resposta:**

```json
{
  "cidade": "Belo Horizonte",
  "estado": "MG",
  "pais": "Brasil",
  "latitude": -19.9167,
  "longitude": -43.9345,
  "temperaturaAtual": 24.3,
  "umidade": 58,
  "velocidadeVento": 12.4,
  "direcaoVento": 135,
  "temperaturaMaxima": 28.1,
  "temperaturaMinima": 17.6,
  "condicaoTempo": "Parcialmente nublado",
  "dataConsulta": "2026-08-26T14:32:10.123"
}
```

### 2. Clima atual de outra cidade (desafio extra)

```
GET /clima/{cidade}
```

Exemplo:

```
GET /clima/Sao Paulo
GET /clima/Curitiba
```

### 3. Previsão para os próximos dias — Belo Horizonte (desafio extra)

```
GET /clima/previsao?dias=5
```

`dias` é opcional (padrão: 5, máximo: 16).

**Exemplo de resposta:**

```json
[
  {
    "data": "2026-08-26",
    "temperaturaMaxima": 28.1,
    "temperaturaMinima": 17.6,
    "condicaoTempo": "Parcialmente nublado"
  },
  {
    "data": "2026-08-27",
    "temperaturaMaxima": 27.0,
    "temperaturaMinima": 16.9,
    "condicaoTempo": "Ceu limpo"
  }
]
```

### 4. Previsão para os próximos dias — outra cidade (desafio extra)

```
GET /clima/{cidade}/previsao?dias=3
```

## ⚠️ Tratamento de erros

Todas as respostas de erro seguem um formato JSON padronizado:

```json
{
  "timestamp": "2026-08-26T14:35:00.512",
  "status": 404,
  "erro": "Not Found",
  "mensagem": "Cidade nao encontrada: Cidade Inexistente XYZ"
}
```

| Situação                                         | Status HTTP |
|---------------------------------------------------|-------------|
| Cidade informada não encontrada                   | 404         |
| Falha de comunicação com a API externa            | 503         |
| Parâmetro inválido (ex.: `dias` fora do intervalo) | 400         |
| Erro inesperado                                    | 500         |

## 🧪 Testes

```bash
mvn test
```

## ⭐ Desafios extras implementados

- ✅ Consulta de clima para outras cidades (`GET /clima/{cidade}`), via geocoding da Open-Meteo.
- ✅ Previsão para os próximos dias (`GET /clima/previsao` e `GET /clima/{cidade}/previsao`).
- ✅ Tratamento de erros mais completo, com respostas JSON padronizadas e status HTTP apropriados.
