# Diagrama de Casos de Uso

```mermaid
flowchart LR
    cliente((Cliente))
    agente((Agente))
    empresa((Empresa))
    banco((Banco))

    empresa -.->|é um| agente
    banco -.->|é um| agente

    subgraph Sistema de Aluguel de Carros
        uc1([Cadastrar-se])
        uc2([Fazer login])
        uc3([Criar pedido de aluguel])
        uc4([Modificar pedido])
        uc5([Consultar pedidos])
        uc6([Cancelar pedido])
        uc7([Avaliar pedido])
        uc8([Executar contrato])
        uc9([Conceder contrato de crédito])
        uc10([Gerenciar automóveis])
        uc11([Gerenciar clientes])
    end

    cliente --- uc1
    cliente --- uc2
    cliente --- uc3
    cliente --- uc4
    cliente --- uc5
    cliente --- uc6

    agente --- uc2
    agente --- uc4
    agente --- uc5
    agente --- uc7
    agente --- uc8
    agente --- uc10
    agente --- uc11

    banco --- uc9
```

## Descrição

| Caso de uso | Ator | Descrição |
|---|---|---|
| Cadastrar-se | Cliente | Cria a conta com dados pessoais, profissão e rendimentos (até 3) |
| Fazer login | Cliente, Agente | Entra no sistema com usuário e senha |
| Criar pedido de aluguel | Cliente | Escolhe um automóvel e as datas do aluguel |
| Modificar pedido | Cliente, Agente | Altera dados de um pedido que ainda não foi contratado |
| Consultar pedidos | Cliente, Agente | Cliente vê os seus pedidos, agente vê todos |
| Cancelar pedido | Cliente | Cancela um pedido que ainda não foi contratado |
| Avaliar pedido | Agente | Faz a análise financeira e dá parecer positivo ou negativo |
| Executar contrato | Agente | Transforma um pedido aprovado em contrato |
| Conceder contrato de crédito | Banco | Associa um contrato de crédito ao aluguel |
| Gerenciar automóveis | Agente | Cadastra, edita e remove automóveis |
| Gerenciar clientes | Agente | CRUD de clientes |
