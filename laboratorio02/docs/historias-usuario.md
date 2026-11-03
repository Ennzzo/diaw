# Histórias de Usuário

**HU01 - Cadastro**
Como cliente, quero me cadastrar informando meus dados (RG, CPF, nome, endereço, profissão e rendimentos) para poder usar o sistema.
- Critério: o CPF e o login não podem repetir.
- Critério: no máximo 3 rendimentos.

**HU02 - Login**
Como usuário (cliente ou agente), quero entrar com usuário e senha para acessar o sistema.
- Critério: sem login nenhuma tela além do login/cadastro pode ser acessada.

**HU03 - Criar pedido**
Como cliente, quero criar um pedido de aluguel escolhendo um automóvel e as datas para alugar um carro.
- Critério: o pedido começa com status PENDENTE.
- Critério: a data de fim não pode ser antes da data de início.

**HU04 - Consultar pedidos**
Como cliente, quero ver meus pedidos e o status de cada um para acompanhar a análise.

**HU05 - Modificar pedido**
Como cliente, quero alterar um pedido que ainda não foi avaliado para corrigir datas ou o carro escolhido.

**HU06 - Cancelar pedido**
Como cliente, quero cancelar um pedido que ainda não virou contrato.

**HU07 - Avaliar pedido**
Como agente, quero analisar financeiramente os pedidos e aprovar ou reprovar, para decidir se o aluguel pode acontecer.

**HU08 - Executar contrato**
Como agente, quero executar o contrato de um pedido aprovado, definindo se o carro fica registrado no nome do cliente, da empresa ou do banco.

**HU09 - Contrato de crédito**
Como banco, quero conceder um contrato de crédito para um aluguel aprovado.

**HU10 - Gerenciar clientes**
Como agente, quero cadastrar, listar, editar e excluir clientes.

**HU11 - Gerenciar automóveis**
Como agente, quero cadastrar automóveis (matrícula, ano, marca, modelo e placa) para que fiquem disponíveis nos pedidos.
