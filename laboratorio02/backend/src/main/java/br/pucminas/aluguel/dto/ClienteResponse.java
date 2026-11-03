package br.pucminas.aluguel.dto;

import br.pucminas.aluguel.model.Cliente;

import java.util.List;

public record ClienteResponse(
        Long id,
        String nome,
        String login,
        String rg,
        String cpf,
        String endereco,
        String profissao,
        List<RendimentoDTO> rendimentos
) {
    public static ClienteResponse from(Cliente c) {
        List<RendimentoDTO> rendimentos = c.getRendimentos().stream()
                .map(r -> new RendimentoDTO(r.getEntidadeEmpregadora(), r.getValor()))
                .toList();
        return new ClienteResponse(c.getId(), c.getNome(), c.getLogin(), c.getRg(), c.getCpf(),
                c.getEndereco(), c.getProfissao(), rendimentos);
    }
}
