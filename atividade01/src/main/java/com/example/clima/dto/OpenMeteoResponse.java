package com.example.clima.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Mapeia o JSON devolvido pelo endpoint /v1/forecast da Open-Meteo.
 * Apenas os campos usados pela aplicacao sao declarados; o resto e ignorado.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record OpenMeteoResponse(Double latitude, Double longitude, Current current, Daily daily) {

    /** Bloco "current": dados do momento. */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Current(
            @JsonProperty("temperature_2m") Double temperatura,
            @JsonProperty("relative_humidity_2m") Integer umidade,
            @JsonProperty("wind_speed_10m") Double velocidadeVento,
            @JsonProperty("wind_direction_10m") Integer direcaoVento,
            @JsonProperty("weather_code") Integer codigoTempo
    ) {}

    /** Bloco "daily": listas com um valor por dia (pedimos so 1 dia). */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Daily(
            @JsonProperty("temperature_2m_max") List<Double> maximas,
            @JsonProperty("temperature_2m_min") List<Double> minimas
    ) {}
}
