package com.example.clima.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * Representa a resposta JSON do endpoint de geocoding da Open-Meteo,
 * usado para converter o nome de uma cidade em latitude/longitude
 * (necessario para o desafio extra de consultar outras cidades).
 *
 * Exemplo: https://geocoding-api.open-meteo.com/v1/search?name=Belo+Horizonte&count=1
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeocodingResponse {

    private List<Resultado> results;

    public List<Resultado> getResults() {
        return results;
    }

    public void setResults(List<Resultado> results) {
        this.results = results;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Resultado {

        private String name;
        private Double latitude;
        private Double longitude;
        private String country;
        private String admin1; // estado/regiao

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getAdmin1() {
            return admin1;
        }

        public void setAdmin1(String admin1) {
            this.admin1 = admin1;
        }
    }

}
