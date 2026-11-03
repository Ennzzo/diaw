package br.pucminas.aluguel.controller;

import br.pucminas.aluguel.dto.AutomovelRequest;
import br.pucminas.aluguel.model.Automovel;
import br.pucminas.aluguel.service.AutomovelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/automoveis")
public class AutomovelController {

    private final AutomovelService automovelService;

    public AutomovelController(AutomovelService automovelService) {
        this.automovelService = automovelService;
    }

    @GetMapping
    public List<Automovel> listar() {
        return automovelService.listar();
    }

    @GetMapping("/{id}")
    public Automovel buscar(@PathVariable Long id) {
        return automovelService.buscar(id);
    }

    @PostMapping
    public ResponseEntity<Automovel> criar(@RequestBody @Valid AutomovelRequest dados) {
        return ResponseEntity.status(HttpStatus.CREATED).body(automovelService.criar(dados));
    }

    @PutMapping("/{id}")
    public Automovel atualizar(@PathVariable Long id, @RequestBody @Valid AutomovelRequest dados) {
        return automovelService.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        automovelService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
