package com.example.clima.dto;

/**
 * Objeto de resposta proprio da aplicacao, montado a partir dos dados
 * recebidos da API externa.
 */
public record ClimaResponse(
        String cidade,
        String estado,
        String pais,
        Double latitude,
        Double longitude,
        Double temperaturaAtual,
        Integer umidade,
        Double velocidadeVento,
        Integer direcaoVento,
        Double temperaturaMaxima,
        Double temperaturaMinima,
        String condicaoTempo,
        String dataConsulta
) {}
