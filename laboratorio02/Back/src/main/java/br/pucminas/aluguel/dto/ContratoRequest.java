package br.pucminas.aluguel.dto;

import br.pucminas.aluguel.model.TipoProprietario;
import jakarta.validation.constraints.NotNull;

public record ContratoRequest(@NotNull TipoProprietario proprietario) {
}
