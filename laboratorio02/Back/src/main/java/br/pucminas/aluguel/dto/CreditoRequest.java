package br.pucminas.aluguel.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record CreditoRequest(
        @NotNull @Positive BigDecimal valor,
        @NotNull @PositiveOrZero BigDecimal taxaJuros,
        @NotNull @Min(1) @Max(72) Integer parcelas
) {
}
