package br.pucminas.aluguel.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PedidoRequest(
        @NotNull Long automovelId,
        @NotNull @FutureOrPresent LocalDate dataInicio,
        @NotNull LocalDate dataFim
) {
}
