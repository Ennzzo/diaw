package br.pucminas.aluguel.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AvaliacaoRequest(@NotNull Boolean aprovado, @NotBlank String parecer) {
}
