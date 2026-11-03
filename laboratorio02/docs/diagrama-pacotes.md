# Diagrama de Pacotes (Visão Lógica)

O sistema é dividido em dois subsistemas, como pede o enunciado: o **back-end** (gestão de pedidos e contratos, em Spring Boot com MVC) e o **front-end** (construção dinâmica das páginas web, em React).

```mermaid
flowchart TB
    subgraph frontend [Front-end - React + Vite]
        pages[pages]
        components[components]
        services[services / api]
        context[context / auth]
        pages --> components
        pages --> services
        pages --> context
        services --> context
    end

    subgraph backend [Back-end - Spring Boot]
        controller[controller]
        dto[dto]
        service[service]
        repository[repository]
        model[model]
        security[security]
        config[config]

        controller --> service
        controller --> dto
        service --> repository
        service --> model
        service --> dto
        repository --> model
        security --> repository
        config --> security
    end

    db[(Supabase - PostgreSQL)]

    services -- HTTP / JSON --> controller
    repository -- JPA --> db
```

| Pacote | Responsabilidade |
|---|---|
| model | Entidades JPA (Model do MVC) |
| repository | Acesso ao banco com Spring Data JPA |
| service | Regras de negócio |
| controller | Endpoints REST (Controller do MVC) |
| dto | Objetos de entrada e saída da API |
| security | Geração e validação do token JWT |
| config | Configuração do Spring Security e CORS |
| front-end | Páginas React (View do MVC) |
