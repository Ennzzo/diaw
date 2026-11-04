package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.dto.ContratoRequest;
import br.pucminas.aluguel.dto.CreditoRequest;
import br.pucminas.aluguel.dto.PedidoResponse;
import br.pucminas.aluguel.model.Agente;
import br.pucminas.aluguel.service.AuthService;
import br.pucminas.aluguel.service.ContratoService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos/{pedidoId}")
public class ContratoController {

    private final ContratoService contratoService;
    private final AuthService authService;

    public ContratoController(ContratoService contratoService, AuthService authService) {
        this.contratoService = contratoService;
        this.authService = authService;
    }

    @PostMapping("/contrato")
    public PedidoResponse executar(@PathVariable Long pedidoId, @RequestBody @Valid ContratoRequest dados) {
        return contratoService.executarContrato(pedidoId, dados);
    }

    @PostMapping("/credito")
    public PedidoResponse conceder(@PathVariable Long pedidoId, @RequestBody @Valid CreditoRequest dados,
                                   Authentication auth) {
        Agente banco = (Agente) authService.usuarioLogado(auth.getName());
        return contratoService.concederCredito(pedidoId, dados, banco);
    }
}
