package br.pucminas.aluguel.dto;

import br.pucminas.aluguel.model.Automovel;
import br.pucminas.aluguel.model.Pedido;
import br.pucminas.aluguel.model.StatusPedido;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PedidoResponse(
        Long id,
        Long clienteId,
        String clienteNome,
        Automovel automovel,
        LocalDate dataInicio,
        LocalDate dataFim,
        StatusPedido status,
        LocalDateTime dataCriacao
) {
    public static PedidoResponse from(Pedido p) {
        return new PedidoResponse(p.getId(), p.getCliente().getId(), p.getCliente().getNome(), p.getAutomovel(),
                p.getDataInicio(), p.getDataFim(), p.getStatus(), p.getDataCriacao());
    }
}
