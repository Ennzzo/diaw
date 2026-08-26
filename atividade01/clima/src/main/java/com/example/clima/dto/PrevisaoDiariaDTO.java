package com.example.clima.dto;

/**
 * Representa a previsao do tempo para um unico dia.
 * Usado no desafio extra: "Consultar previsao para os proximos dias".
 */
public class PrevisaoDiariaDTO {

    private String data;
    private Double temperaturaMaxima;
    private Double temperaturaMinima;
    private String condicaoTempo;

    public PrevisaoDiariaDTO() {
    }

    public PrevisaoDiariaDTO(String data, Double temperaturaMaxima, Double temperaturaMinima, String condicaoTempo) {
        this.data = data;
        this.temperaturaMaxima = temperaturaMaxima;
        this.temperaturaMinima = temperaturaMinima;
        this.condicaoTempo = condicaoTempo;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Double getTemperaturaMaxima() {
        return temperaturaMaxima;
    }

    public void setTemperaturaMaxima(Double temperaturaMaxima) {
        this.temperaturaMaxima = temperaturaMaxima;
    }

    public Double getTemperaturaMinima() {
        return temperaturaMinima;
    }

    public void setTemperaturaMinima(Double temperaturaMinima) {
        this.temperaturaMinima = temperaturaMinima;
    }

    public String getCondicaoTempo() {
        return condicaoTempo;
    }

    public void setCondicaoTempo(String condicaoTempo) {
        this.condicaoTempo = condicaoTempo;
    }
}
