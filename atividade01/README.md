# Clima API - Atividade 01

API REST feita com Java e Spring Boot que retorna as informações do clima de Belo Horizonte - MG.
Os dados vêm da Open-Meteo, que é uma API pública de previsão do tempo.

Aluno: Enzo Bambirra

## API externa utilizada

Escolhi a Open-Meteo porque é gratuita e não pede cadastro nem API Key. O projeto usa dois
serviços dela:

- `https://api.open-meteo.com/v1/forecast` - retorna o clima a partir de uma latitude e longitude
- `https://geocoding-api.open-meteo.com/v1/search` - descobre a latitude e a longitude de uma
  cidade pelo nome

A documentação está em https://open-meteo.com/en/docs

## Configuração da API Key

A Open-Meteo não exige API Key, então não precisa configurar nada para rodar o projeto.

Se fosse usada uma API que pede chave, como a OpenWeather, ela não deveria ficar escrita direto no
código. O jeito correto seria declarar no `application.properties` lendo de uma variável de
ambiente:

```properties
clima.api.key=${CLIMA_API_KEY}
```

e depois ler no service com `@Value("${clima.api.key}")`. Assim a chave não vai junto para o
repositório.

## Como rodar

É preciso ter o Java 25 instalado e estar conectado na internet, já que a aplicação consulta a
Open-Meteo na hora da requisição.

```
git clone https://github.com/Ennzzo/diaw.git
cd diaw/atividade01
./mvnw spring-boot:run
```

A aplicação sobe na porta 8080.

Para gerar o jar e rodar por ele:

```
./mvnw clean package
java -jar target/clima-1.0.0.jar
```

Para rodar os testes:

```
./mvnw test
```

## Dependências

- `spring-boot-starter-web` - cria a API REST, faz as requisições com o RestTemplate e converte o
  JSON automaticamente
- `spring-boot-starter-test` - testes com JUnit

As versões são controladas pelo `spring-boot-starter-parent` 4.1.1, declarado no `pom.xml`.

## Organização do projeto

```
src/main/java/com/example/clima/
├── ClimaApplication.java             classe principal
├── controller/ClimaController.java   endpoints
├── service/ClimaService.java         chama a API externa e monta a resposta
├── dto/
│   ├── ClimaResponse.java            resposta da nossa API
│   ├── OpenMeteoResponse.java        mapeia o JSON do forecast
│   └── GeocodingResponse.java        mapeia o JSON do geocoding
└── util/WeatherCodeMapper.java       traduz o código do tempo para texto
```

O controller só recebe a requisição e repassa para o service, que é onde ficam as chamadas para a
API externa e a montagem da resposta. As classes de dto servem para carregar os dados: duas
representam o JSON que vem da Open-Meteo e a `ClimaResponse` é o objeto que a nossa API devolve.

As coordenadas de Belo Horizonte e as URLs da API externa ficam no `application.properties`, para
não deixar esses valores fixos no meio do código.

## Endpoints

### GET /clima

Retorna o clima atual de Belo Horizonte.

```
curl http://localhost:8080/clima
```

```json
{
  "cidade": "Belo Horizonte",
  "estado": "MG",
  "pais": "Brasil",
  "latitude": -19.9297,
  "longitude": -43.966034,
  "temperaturaAtual": 18.0,
  "umidade": 86,
  "velocidadeVento": 5.7,
  "direcaoVento": 148,
  "temperaturaMaxima": 26.7,
  "temperaturaMinima": 18.1,
  "condicaoTempo": "Garoa",
  "dataConsulta": "2026-08-26T23:39:54.766066609"
}
```

As temperaturas estão em graus Celsius, a umidade em porcentagem, a velocidade do vento em km/h e
a direção do vento em graus, onde 0 é o Norte.

A Open-Meteo não manda a descrição do tempo escrita, só um código numérico do padrão WMO. Quem
converte esse código para texto é a classe `WeatherCodeMapper`.

### GET /clima/{cidade}

Esse é o desafio extra, que permite consultar o clima de outras cidades.

```
curl http://localhost:8080/clima/Curitiba
curl http://localhost:8080/clima/belo-horizonte
curl "http://localhost:8080/clima/Sao%20Paulo"
```

Como a Open-Meteo trabalha só com coordenadas, antes de buscar o clima a aplicação chama o
geocoding para descobrir a latitude e a longitude da cidade informada. Não precisa colocar acento
e dá para usar hífen no lugar do espaço, como em `sao-paulo`.

## Tratamento de erros

Se a cidade não existir, a resposta é 404:

```json
{
  "timestamp": "2026-08-27T02:39:57.523Z",
  "status": 404,
  "error": "Not Found",
  "message": "Cidade nao encontrada: Zzz999",
  "path": "/clima/Zzz999"
}
```

Se a Open-Meteo estiver fora do ar ou a requisição falhar, a resposta é 503 com uma mensagem
avisando que não foi possível consultar o clima no momento.
