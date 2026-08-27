package com.example.clima.service;

import com.example.clima.dto.ClimaResponse;
import com.example.clima.dto.GeocodingResponse;
import com.example.clima.dto.OpenMeteoResponse;
import com.example.clima.util.WeatherCodeMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

/**
 * Consome a API externa (Open-Meteo) e monta a resposta da aplicacao.
 */
@Service
public class ClimaService {

    private final RestTemplate restTemplate = new RestTemplate();

    // Valores lidos do application.properties
    @Value("${clima.api.forecast-url}")
    private String forecastUrl;

    @Value("${clima.api.geocoding-url}")
    private String geocodingUrl;

    @Value("${clima.bh.cidade}")
    private String bhCidade;

    @Value("${clima.bh.estado}")
    private String bhEstado;

    @Value("${clima.bh.latitude}")
    private double bhLatitude;

    @Value("${clima.bh.longitude}")
    private double bhLongitude;

    /** Clima de Belo Horizonte: as coordenadas ja estao no application.properties. */
    public ClimaResponse consultarBeloHorizonte() {
        return consultarClima(bhCidade, bhEstado, "Brasil", bhLatitude, bhLongitude);
    }

    /**
     * Desafio extra: clima de outra cidade.
     * A Open-Meteo so aceita coordenadas, entao primeiro descobrimos a
     * latitude e a longitude da cidade pelo servico de geocoding.
     */
    public ClimaResponse consultarPorCidade(String cidade) {

        // "belo-horizonte" vira "belo horizonte"; o encode troca o espaco por "+"
        String nome = cidade.replace("-", " ").trim();
        String url = geocodingUrl
                + "?name=" + URLEncoder.encode(nome, StandardCharsets.UTF_8)
                + "&count=1"
                + "&language=pt";

        GeocodingResponse resposta;

        try {
            resposta = restTemplate.getForObject(url, GeocodingResponse.class);
        } catch (RestClientException e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Nao foi possivel consultar a localizacao da cidade");
        }

        // Quando nao encontra a cidade, a API devolve 200 com a lista vazia
        if (resposta == null || resposta.results() == null || resposta.results().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Cidade nao encontrada: " + cidade);
        }

        GeocodingResponse.Cidade local = resposta.results().get(0);

        return consultarClima(local.name(), local.admin1(), local.country(),
                local.latitude(), local.longitude());
    }

    /** Consulta o clima nas coordenadas informadas. */
    private ClimaResponse consultarClima(String cidade, String estado, String pais,
                                         double latitude, double longitude) {

        String url = forecastUrl
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,"
                + "wind_direction_10m,weather_code"
                + "&daily=temperature_2m_max,temperature_2m_min"
                + "&forecast_days=1"
                + "&timezone=America/Sao_Paulo";

        OpenMeteoResponse resposta;

        try {
            resposta = restTemplate.getForObject(url, OpenMeteoResponse.class);
        } catch (RestClientException e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Nao foi possivel consultar a API de clima no momento");
        }

        if (resposta == null || resposta.current() == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "A API externa nao retornou os dados do clima");
        }

        OpenMeteoResponse.Current atual = resposta.current();

        // A maxima e a minima vem em listas, com uma posicao por dia.
        // Como pedimos apenas 1 dia, usamos a primeira posicao.
        Double maxima = null;
        Double minima = null;

        if (resposta.daily() != null) {
            maxima = resposta.daily().maximas().get(0);
            minima = resposta.daily().minimas().get(0);
        }

        return new ClimaResponse(
                cidade,
                estado,
                pais,
                resposta.latitude(),
                resposta.longitude(),
                atual.temperatura(),
                atual.umidade(),
                atual.velocidadeVento(),
                atual.direcaoVento(),
                maxima,
                minima,
                WeatherCodeMapper.descrever(atual.codigoTempo()),
                LocalDateTime.now().toString()
        );
    }
}
