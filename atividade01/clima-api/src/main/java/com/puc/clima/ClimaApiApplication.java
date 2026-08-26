package com.puc.clima;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicacao.
 *
 * Atividade 01 - API REST de Clima com Spring Boot
 * Consulta informacoes meteorologicas de Belo Horizonte - MG
 * utilizando a API publica Open-Meteo.
 */
@SpringBootApplication
public class ClimaApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClimaApiApplication.class, args);
    }

}
