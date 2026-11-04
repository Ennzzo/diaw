package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.service.StatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

// GET / e GET /api/status -> { "api": "online", "banco": "online" }
@RestController
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping({"/", "/api/status"})
    public Map<String, String> status() {
        Map<String, String> resposta = new LinkedHashMap<>();
        resposta.put("api", "online");
        resposta.put("banco", statusService.bancoOnline() ? "online" : "offline");
        return resposta;
    }
}
