package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.dto.PedidoRequest;
import br.pucminas.aluguel.dto.PedidoResponse;
import br.pucminas.aluguel.model.Cliente;
import br.pucminas.aluguel.model.Usuario;
import br.pucminas.aluguel.service.AuthService;
import br.pucminas.aluguel.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;
    private final AuthService authService;

    public PedidoController(PedidoService pedidoService, AuthService authService) {
        this.pedidoService = pedidoService;
        this.authService = authService;
    }

    @GetMapping
    public List<PedidoResponse> listar(Authentication auth) {
        return pedidoService.listar(usuario(auth));
    }

    @GetMapping("/{id}")
    public PedidoResponse buscar(@PathVariable Long id, Authentication auth) {
        return pedidoService.buscar(id, usuario(auth));
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> criar(@RequestBody @Valid PedidoRequest dados, Authentication auth) {
        Cliente cliente = (Cliente) usuario(auth);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.criar(dados, cliente));
    }

    @PutMapping("/{id}")
    public PedidoResponse atualizar(@PathVariable Long id, @RequestBody @Valid PedidoRequest dados, Authentication auth) {
        return pedidoService.atualizar(id, dados, usuario(auth));
    }

    @PatchMapping("/{id}/cancelar")
    public PedidoResponse cancelar(@PathVariable Long id, Authentication auth) {
        return pedidoService.cancelar(id, usuario(auth));
    }

    private Usuario usuario(Authentication auth) {
        return authService.usuarioLogado(auth.getName());
    }
}
