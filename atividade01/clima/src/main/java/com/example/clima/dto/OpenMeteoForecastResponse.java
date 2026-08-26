package com.example.clima.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Representa a resposta JSON retornada pelo endpoint /v1/forecast da API
 * externa Open-Meteo. Apenas os campos utilizados pela aplicacao sao
 * mapeados; os demais sao ignorados.
 *
 * Exemplo de resposta real da Open-Meteo:
 * https://api.open-meteo.com/v1/forecast?latitude=-19.92&longitude=-43.93&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Sao_Paulo
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenMeteoForecastResponse {

    private Double latitude;
    private Double longitude;
    private String timezone;

    private Current current;
    private Daily daily;

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

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }

    public Daily getDaily() {
        return daily;
    }

    public void setDaily(Daily daily) {
        this.daily = daily;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Current {

        private String time;

        @JsonProperty("temperature_2m")
        private Double temperatura;

        @JsonProperty("relative_humidity_2m")
        private Integer umidade;

        @JsonProperty("wind_speed_10m")
        private Double velocidadeVento;

        @JsonProperty("wind_direction_10m")
        private Integer direcaoVento;

        @JsonProperty("weather_code")
        private Integer weatherCode;

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public Double getTemperatura() {
            return temperatura;
        }

        public void setTemperatura(Double temperatura) {
            this.temperatura = temperatura;
        }

        public Integer getUmidade() {
            return umidade;
        }

        public void setUmidade(Integer umidade) {
            this.umidade = umidade;
        }

        public Double getVelocidadeVento() {
            return velocidadeVento;
        }

        public void setVelocidadeVento(Double velocidadeVento) {
            this.velocidadeVento = velocidadeVento;
        }

        public Integer getDirecaoVento() {
            return direcaoVento;
        }

        public void setDirecaoVento(Integer direcaoVento) {
            this.direcaoVento = direcaoVento;
        }

        public Integer getWeatherCode() {
            return weatherCode;
        }

        public void setWeatherCode(Integer weatherCode) {
            this.weatherCode = weatherCode;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Daily {

        private List<String> time;

        @JsonProperty("temperature_2m_max")
        private List<Double> temperaturaMaxima;

        @JsonProperty("temperature_2m_min")
        private List<Double> temperaturaMinima;

        @JsonProperty("weather_code")
        private List<Integer> weatherCode;

        public List<String> getTime() {
            return time;
        }

        public void setTime(List<String> time) {
            this.time = time;
        }

        public List<Double> getTemperaturaMaxima() {
            return temperaturaMaxima;
        }

        public void setTemperaturaMaxima(List<Double> temperaturaMaxima) {
            this.temperaturaMaxima = temperaturaMaxima;
        }

        public List<Double> getTemperaturaMinima() {
            return temperaturaMinima;
        }

        public void setTemperaturaMinima(List<Double> temperaturaMinima) {
            this.temperaturaMinima = temperaturaMinima;
        }

        public List<Integer> getWeatherCode() {
            return weatherCode;
        }

        public void setWeatherCode(List<Integer> weatherCode) {
            this.weatherCode = weatherCode;
        }
    }

}
