package com.example.candidatosTSE.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.candidatosTSE.model.Candidato;
import com.example.candidatosTSE.service.CandidatosTseService;

@Controller
public class CandidatosTseController {

    private final CandidatosTseService candidatosTseService;

    public CandidatosTseController(CandidatosTseService candidatosTseService) {
        this.candidatosTseService = candidatosTseService;
    }

    @GetMapping({"/", "/index"})
    public String index(@RequestParam(required = false) String texto,
                        @RequestParam(required = false) String cargo,
                        @RequestParam(required = false) String partido,
                        Model model) {

        List<Candidato> candidatos = candidatosTseService.filtrar(cargo, partido, texto);

        model.addAttribute("candidatos", candidatos);
        model.addAttribute("total", candidatos.size());
        model.addAttribute("cargos", candidatosTseService.listarCargos());
        model.addAttribute("partidos", candidatosTseService.listarPartidos());
        model.addAttribute("texto", texto);
        model.addAttribute("cargo", cargo);
        model.addAttribute("partido", partido);

        return "index";
    }
}
