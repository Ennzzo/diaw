package br.pucminas.aluguel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ClienteRequest(
        @NotBlank String nome,
        @NotBlank String login,
        String senha,
        @NotBlank String rg,
        @NotBlank @Size(min = 11, max = 14) String cpf,
        String endereco,
        String profissao,
        @Valid @Size(max = 3, message = "maximo de 3 rendimentos") List<RendimentoDTO> rendimentos
) {
}
