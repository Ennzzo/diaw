package com.example.clima.controller;

import com.example.clima.dto.ClimaResponse;
import com.example.clima.service.ClimaService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints da API:
 * - GET /clima            -> clima atual de Belo Horizonte
 * - GET /clima/{cidade}   -> clima atual de outra cidade (desafio extra)
 */
@RestController
public class ClimaController {

    private final ClimaService service;

    public ClimaController(ClimaService service) {
        this.service = service;
    }

    @GetMapping("/clima")
    public ClimaResponse consultarBeloHorizonte() {
        return service.consultarBeloHorizonte();
    }

    @GetMapping("/clima/{cidade}")
    public ClimaResponse consultarPorCidade(@PathVariable String cidade) {
        return service.consultarPorCidade(cidade);
    }
}
