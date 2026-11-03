package br.pucminas.aluguel.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AutomovelRequest(
        @NotBlank String matricula,
        @NotNull @Min(1950) @Max(2030) Integer ano,
        @NotBlank String marca,
        @NotBlank String modelo,
        @NotBlank String placa
) {
}
