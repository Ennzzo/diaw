package com.example.clima.util;

import java.util.Map;

/**
 * A Open-Meteo retorna a condicao do tempo como um codigo numerico
 * seguindo o padrao WMO (World Meteorological Organization), e nao
 * como uma descricao textual pronta.
 *
 * Esta classe converte esse codigo em uma descricao em portugues,
 * atendendo ao requisito de "Descricao das condicoes do tempo".
 *
 * Tabela oficial de codigos:
 * https://open-meteo.com/en/docs (secao "WMO Weather interpretation codes")
 */
public final class WeatherCodeMapper {

    private static final Map<Integer, String> DESCRICOES = Map.ofEntries(
            Map.entry(0, "Ceu limpo"),
            Map.entry(1, "Predominantemente limpo"),
            Map.entry(2, "Parcialmente nublado"),
            Map.entry(3, "Nublado"),
            Map.entry(45, "Nevoeiro"),
            Map.entry(48, "Nevoeiro com deposito de gelo"),
            Map.entry(51, "Garoa fraca"),
            Map.entry(53, "Garoa moderada"),
            Map.entry(55, "Garoa intensa"),
            Map.entry(56, "Garoa congelante fraca"),
            Map.entry(57, "Garoa congelante intensa"),
            Map.entry(61, "Chuva fraca"),
            Map.entry(63, "Chuva moderada"),
            Map.entry(65, "Chuva forte"),
            Map.entry(66, "Chuva congelante fraca"),
            Map.entry(67, "Chuva congelante forte"),
            Map.entry(71, "Neve fraca"),
            Map.entry(73, "Neve moderada"),
            Map.entry(75, "Neve forte"),
            Map.entry(77, "Graos de neve"),
            Map.entry(80, "Pancadas de chuva fracas"),
            Map.entry(81, "Pancadas de chuva moderadas"),
            Map.entry(82, "Pancadas de chuva violentas"),
            Map.entry(85, "Pancadas de neve fracas"),
            Map.entry(86, "Pancadas de neve fortes"),
            Map.entry(95, "Trovoada"),
            Map.entry(96, "Trovoada com granizo fraco"),
            Map.entry(99, "Trovoada com granizo forte")
    );

    private WeatherCodeMapper() {
        // classe utilitaria, nao deve ser instanciada
    }

    public static String descrever(Integer codigo) {
        if (codigo == null) {
            return "Condicao indisponivel";
        }
        return DESCRICOES.getOrDefault(codigo, "Condicao desconhecida (codigo " + codigo + ")");
    }

}
