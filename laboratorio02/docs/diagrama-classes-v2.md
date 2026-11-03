# Diagrama de Classes - v2

Versão atualizada depois da implementação. A [v1](diagrama-classes-v1.md) foi mantida para comparação.

```mermaid
classDiagram
    class Usuario {
        <<abstract>>
        -Long id
        -String nome
        -String login
        -String senha
        +getPerfil() String
    }

    class Cliente {
        -String rg
        -String cpf
        -String endereco
        -String profissao
        -List~Rendimento~ rendimentos
        +getPerfil() String
        +getRendaTotal() BigDecimal
        +adicionarRendimento(Rendimento)
    }

    class Rendimento {
        -Long id
        -String entidadeEmpregadora
        -BigDecimal valor
    }

    class Agente {
        -String cnpj
        -TipoAgente tipo
        +getPerfil() String
    }

    class TipoAgente {
        <<enumeration>>
        EMPRESA
        BANCO
    }

    class Automovel {
        -Long id
        -String matricula
        -Integer ano
        -String marca
        -String modelo
        -String placa
        -TipoProprietario proprietario
    }

    class TipoProprietario {
        <<enumeration>>
        CLIENTE
        EMPRESA
        BANCO
    }

    class Pedido {
        -Long id
        -LocalDate dataInicio
        -LocalDate dataFim
        -StatusPedido status
        -LocalDateTime dataCriacao
        -String parecer
        -LocalDateTime dataAvaliacao
        +podeSerAlterado() boolean
        +podeSerCancelado() boolean
    }

    class StatusPedido {
        <<enumeration>>
        PENDENTE
        APROVADO
        REPROVADO
        CANCELADO
        CONTRATADO
    }

    class Contrato {
        -Long id
        -TipoProprietario proprietario
        -LocalDate dataAssinatura
    }

    class ContratoCredito {
        -Long id
        -BigDecimal valor
        -BigDecimal taxaJuros
        -Integer parcelas
        -LocalDate dataConcessao
    }

    Usuario <|-- Cliente
    Usuario <|-- Agente
    Agente --> TipoAgente
    Cliente "1" *-- "0..3" Rendimento
    Cliente "1" -- "*" Pedido : faz
    Pedido "*" --> "1" Automovel
    Pedido --> StatusPedido
    Pedido "*" --> "0..1" Agente : avaliado por
    Pedido "1" -- "0..1" Contrato
    Contrato --> TipoProprietario
    Automovel --> TipoProprietario
    Contrato "1" *-- "0..1" ContratoCredito
    ContratoCredito "*" --> "1" Agente : banco
```

## Mudanças em relação à v1

- `StatusPedido` ganhou o status **CONTRATADO**, para diferenciar um pedido só aprovado de um que já virou contrato.
- `Pedido` passou a guardar o **parecer** da análise financeira, o agente que avaliou e as datas de criação/avaliação.
- O proprietário do contrato deixou de ser `String` e virou o enum `TipoProprietario` (cliente, empresa ou banco). O `Automovel` também guarda quem é o proprietário depois do contrato.
- `ContratoCredito` ganhou o número de **parcelas** e a ligação com o banco que concedeu o crédito.
- Valores em dinheiro passaram de `double` para `BigDecimal`.
- `Usuario` ganhou o método abstrato `getPerfil()`, usado no login para saber se é cliente ou agente.
- `Cliente` ganhou `getRendaTotal()`, mostrado para o agente na hora da avaliação.
