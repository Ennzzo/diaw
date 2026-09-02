package com.example.clima.util;

/**
 * A Open-Meteo devolve a condicao do tempo como um codigo numerico do
 * padrao WMO, e nao como texto. Esta classe traduz esse codigo para uma
 * descricao em portugues.
 *
 * Tabela: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
 */
public class WeatherCodeMapper {

    public static String descrever(Integer codigo) {
        if (codigo == null) {
            return "Condicao indisponivel";
        }

        return switch (codigo) {
            case 0 -> "Ceu limpo";
            case 1 -> "Predominantemente limpo";
            case 2 -> "Parcialmente nublado";
            case 3 -> "Nublado";
            case 45, 48 -> "Nevoeiro";
            case 51, 53, 55 -> "Garoa";
            case 56, 57, 66, 67 -> "Chuva congelante";
            case 61, 63, 65 -> "Chuva";
            case 71, 73, 75, 77 -> "Neve";
            case 80, 81, 82 -> "Pancadas de chuva";
            case 85, 86 -> "Pancadas de neve";
            case 95, 96, 99 -> "Trovoada";
            default -> "Condicao desconhecida (codigo " + codigo + ")";
        };
    }
}
