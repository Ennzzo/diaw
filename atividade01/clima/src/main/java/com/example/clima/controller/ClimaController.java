package com.example.clima.controller;

import com.example.clima.dto.ClimaResponseDTO;
import com.example.clima.dto.PrevisaoDiariaDTO;
import com.example.clima.service.ClimaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST responsavel por expor as informacoes climaticas.
 *
 * Endpoints:
 * - GET /clima                        -> clima atual de Belo Horizonte (obrigatorio)
 * - GET /clima/{cidade}                -> clima atual de outra cidade (desafio extra)
 * - GET /clima/{cidade}/previsao       -> previsao dos proximos dias para uma cidade (desafio extra)
 * - GET /clima/previsao                -> previsao dos proximos dias para Belo Horizonte (desafio extra)
 */
@RestController
@RequestMapping("/clima")
public class ClimaController {

    private final ClimaService climaService;

    public ClimaController(ClimaService climaService) {
        this.climaService = climaService;
    }

    @GetMapping
    public ClimaResponseDTO getClimaBeloHorizonte() {
        return climaService.getClimaBeloHorizonte();
    }

    @GetMapping("/belo-horizonte")
    public ClimaResponseDTO getClimaBeloHorizonteAlias() {
        return climaService.getClimaBeloHorizonte();
    }

    @GetMapping("/previsao")
    public List<PrevisaoDiariaDTO> getPrevisaoBeloHorizonte(
            @RequestParam(name = "dias", defaultValue = "5") int dias) {
        return climaService.getPrevisao(null, dias);
    }

    @GetMapping("/{cidade}")
    public ClimaResponseDTO getClimaPorCidade(@PathVariable String cidade) {
        return climaService.getClimaPorCidade(cidade);
    }

    @GetMapping("/{cidade}/previsao")
    public List<PrevisaoDiariaDTO> getPrevisaoPorCidade(
            @PathVariable String cidade,
            @RequestParam(name = "dias", defaultValue = "5") int dias) {
        return climaService.getPrevisao(cidade, dias);
    }

}
