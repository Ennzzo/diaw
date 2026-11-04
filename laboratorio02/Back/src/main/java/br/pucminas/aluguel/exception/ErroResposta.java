package br.pucminas.aluguel.exception;

import java.time.LocalDateTime;

// formato padrao dos erros da API, o front mostra o campo "mensagem"
public record ErroResposta(int status, String erro, String mensagem, String caminho, String timestamp) {

    public ErroResposta(int status, String erro, String mensagem, String caminho) {
        this(status, erro, mensagem, caminho, LocalDateTime.now().toString());
    }
}
