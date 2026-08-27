package com.example.clima.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * Mapeia o JSON do geocoding da Open-Meteo, usado para descobrir a
 * latitude/longitude de uma cidade pelo nome.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record GeocodingResponse(List<Cidade> results) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Cidade(
            String name,
            Double latitude,
            Double longitude,
            String country,
            String admin1
    ) {}
}
