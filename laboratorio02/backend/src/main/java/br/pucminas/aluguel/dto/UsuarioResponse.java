package br.pucminas.aluguel.dto;

import br.pucminas.aluguel.model.Agente;
import br.pucminas.aluguel.model.Usuario;

public record UsuarioResponse(Long id, String nome, String login, String perfil, String tipoAgente) {

    public static UsuarioResponse from(Usuario u) {
        String tipo = u instanceof Agente a ? a.getTipo().name() : null;
        return new UsuarioResponse(u.getId(), u.getNome(), u.getLogin(), u.getPerfil(), tipo);
    }
}
