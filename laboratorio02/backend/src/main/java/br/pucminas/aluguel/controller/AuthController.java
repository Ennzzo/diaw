package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.dto.*;
import br.pucminas.aluguel.service.AuthService;
import br.pucminas.aluguel.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClienteService clienteService;
    private final AuthService authService;

    public AuthController(ClienteService clienteService, AuthService authService) {
        this.clienteService = clienteService;
        this.authService = authService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<ClienteResponse> cadastrar(@RequestBody @Valid ClienteRequest dados) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.criar(dados));
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest dados) {
        return authService.login(dados);
    }

    @GetMapping("/me")
    public UsuarioResponse me(Authentication auth) {
        return UsuarioResponse.from(authService.usuarioLogado(auth.getName()));
    }
}
