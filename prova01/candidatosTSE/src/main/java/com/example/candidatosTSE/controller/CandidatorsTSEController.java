package com.example.candidatosTSE.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CandidatorsTseController {

    private final CandidatosTseService CandidatosTseService;

    public CandidatosTseService(CandidatosTseService CandidatosTseService) {
        this.CandidatosTseService = CandidatosTseService;
    }
    
    @GetMapping("/index")
    public String index(Model model) {
        return "index";
    }

    @PostMapping("/register")
    public String handleRegister(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cargo,
            @RequestParam(required = false) String partido,
            Model model) {

        model.addAttribute("nome", nome);
        model.addAttribute("cargo", cargo);
        model.addAttribute("partido", partido);

        return "candidatos/?=sucesso";
    }
}