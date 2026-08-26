package com.example.clima.service;

import com.example.clima.dto.ClimaResponseDTO;
import com.example.clima.dto.GeocodingResponse;
import com.example.clima.dto.OpenMeteoForecastResponse;
import com.example.clima.dto.PrevisaoDiariaDTO;
import com.example.clima.util.WeatherCodeMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClimaService {

    private static final Logger log = LoggerFactory.getLogger(ClimaService.class);

    private final RestTemplate restTemplate;

    @Value("${clima.api.forecast-url}")
    private String forecastUrl;

    @Value("${clima.api.geocoding-url}")
    private String geocodingUrl;

    @Value("${clima.default.cidade}")
    private String cidadePadrao;

    @Value("${clima.default.estado}")
    private String estadoPadrao;

    @Value("${clima.default.latitude}")
    private double latitudePadrao;

    @Value("${clima.default.longitude}")
    private double longitudePadrao;

    public ClimaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ClimaResponseDTO getClimaBeloHorizonte() {
        return consultarClimaAtual(
                cidadePadrao,
                estadoPadrao,
                "Brasil",
                latitudePadrao,
                longitudePadrao
        );
    }

    public ClimaResponseDTO getClimaPorCidade(String nomeCidade) {
        GeocodingResponse.Resultado local = buscarCoordenadas(nomeCidade);

        return consultarClimaAtual(
                local.getName(),
                local.getAdmin1(),
                local.getCountry(),
                local.getLatitude(),
                local.getLongitude()
        );
    }

    public List<PrevisaoDiariaDTO> getPrevisao(String nomeCidade, int dias) {

        if (dias < 1 || dias > 16) {
            throw new IllegalArgumentException(
                    "O parametro 'dias' deve estar entre 1 e 16"
            );
        }

        double latitude;
        double longitude;

        if (nomeCidade == null || nomeCidade.isBlank()) {
            latitude = latitudePadrao;
            longitude = longitudePadrao;
        } else {
            GeocodingResponse.Resultado local = buscarCoordenadas(nomeCidade);
            latitude = local.getLatitude();
            longitude = local.getLongitude();
        }

        String url = UriComponentsBuilder.fromUriString(forecastUrl)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam(
                        "daily",
                        "temperature_2m_max,temperature_2m_min,weather_code"
                )
                .queryParam("forecast_days", dias)
                .queryParam("timezone", "America/Sao_Paulo")
                .toUriString();

        OpenMeteoForecastResponse resposta = executarRequisicao(url);

        if (resposta.getDaily() == null
                || resposta.getDaily().getTime() == null) {

            throw new RuntimeException(
                    "A API externa nao retornou dados de previsao diaria"
            );
        }

        List<PrevisaoDiariaDTO> previsoes = new ArrayList<>();

        List<String> datas = resposta.getDaily().getTime();

        for (int i = 0; i < datas.size(); i++) {

            Double max =
                    resposta.getDaily()
                            .getTemperaturaMaxima()
                            .get(i);

            Double min =
                    resposta.getDaily()
                            .getTemperaturaMinima()
                            .get(i);

            Integer codigo =
                    resposta.getDaily()
                            .getWeatherCode()
                            .get(i);

            previsoes.add(
                    new PrevisaoDiariaDTO(
                            datas.get(i),
                            max,
                            min,
                            WeatherCodeMapper.descrever(codigo)
                    )
            );
        }

        return previsoes;
    }

    private ClimaResponseDTO consultarClimaAtual(
            String cidade,
            String estado,
            String pais,
            double latitude,
            double longitude) {

        String url = UriComponentsBuilder.fromUriString(forecastUrl)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam(
                        "current",
                        "temperature_2m,relative_humidity_2m,"
                                + "wind_speed_10m,wind_direction_10m,weather_code"
                )
                .queryParam(
                        "daily",
                        "temperature_2m_max,temperature_2m_min"
                )
                .queryParam("timezone", "America/Sao_Paulo")
                .toUriString();

        OpenMeteoForecastResponse resposta =
                executarRequisicao(url);

        if (resposta.getCurrent() == null) {
            throw new RuntimeException(
                    "A API externa nao retornou dados climaticos atuais"
            );
        }

        ClimaResponseDTO dto = new ClimaResponseDTO();

        dto.setCidade(cidade);
        dto.setEstado(estado);
        dto.setPais(pais);

        dto.setLatitude(resposta.getLatitude());
        dto.setLongitude(resposta.getLongitude());

        dto.setTemperaturaAtual(
                resposta.getCurrent().getTemperatura()
        );

        dto.setUmidade(
                resposta.getCurrent().getUmidade()
        );

        dto.setVelocidadeVento(
                resposta.getCurrent().getVelocidadeVento()
        );

        dto.setDirecaoVento(
                resposta.getCurrent().getDirecaoVento()
        );

        dto.setCondicaoTempo(
                WeatherCodeMapper.descrever(
                        resposta.getCurrent().getWeatherCode()
                )
        );

        if (resposta.getDaily() != null
                && resposta.getDaily().getTemperaturaMaxima() != null
                && !resposta.getDaily().getTemperaturaMaxima().isEmpty()) {

            dto.setTemperaturaMaxima(
                    resposta.getDaily()
                            .getTemperaturaMaxima()
                            .get(0)
            );

            dto.setTemperaturaMinima(
                    resposta.getDaily()
                            .getTemperaturaMinima()
                            .get(0)
            );
        }

        dto.setDataConsulta(LocalDateTime.now());

        return dto;
    }

    private GeocodingResponse.Resultado buscarCoordenadas(
            String nomeCidade) {

        String url = UriComponentsBuilder.fromUriString(geocodingUrl)
                .queryParam("name", nomeCidade)
                .queryParam("count", 1)
                .queryParam("language", "pt")
                .toUriString();

        GeocodingResponse resposta;

        try {

            resposta = restTemplate.getForObject(
                    url,
                    GeocodingResponse.class
            );

        } catch (RestClientException ex) {

            log.error(
                    "Falha ao consultar geocoding para cidade '{}': {}",
                    nomeCidade,
                    ex.getMessage()
            );

            throw new RuntimeException(
                    "Falha na comunicacao com o servico de geocoding",
                    ex
            );
        }

        if (resposta == null
                || resposta.getResults() == null
                || resposta.getResults().isEmpty()) {

            throw new RuntimeException(
                    "Cidade nao encontrada: " + nomeCidade
            );
        }

        return resposta.getResults().get(0);
    }

    private OpenMeteoForecastResponse executarRequisicao(
            String url) {

        try {

            OpenMeteoForecastResponse resposta =
                    restTemplate.getForObject(
                            url,
                            OpenMeteoForecastResponse.class
                    );

            if (resposta == null) {

                throw new RuntimeException(
                        "A API externa retornou uma resposta vazia"
                );
            }

            return resposta;

        } catch (RestClientException ex) {

            log.error(
                    "Falha na comunicacao com a API externa de clima: {}",
                    ex.getMessage()
            );

            throw new RuntimeException(
                    "Nao foi possivel obter os dados climaticos "
                            + "no momento. Tente novamente mais tarde.",
                    ex
            );
        }
    }
}
