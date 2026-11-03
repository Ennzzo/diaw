package br.pucminas.aluguel.config;

import br.pucminas.aluguel.model.Agente;
import br.pucminas.aluguel.model.TipoAgente;
import br.pucminas.aluguel.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// cria os agentes padrao na primeira vez que o sistema sobe
@Component
public class DadosIniciais implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DadosIniciais(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        criarAgente("Locadora Movimento", "locadora", "12345678000101", TipoAgente.EMPRESA);
        criarAgente("Banco Horizonte", "banco", "98765432000199", TipoAgente.BANCO);
    }

    private void criarAgente(String nome, String login, String cnpj, TipoAgente tipo) {
        if (usuarioRepository.existsByLogin(login)) {
            return;
        }
        Agente agente = new Agente();
        agente.setNome(nome);
        agente.setLogin(login);
        agente.setSenha(passwordEncoder.encode("1234"));
        agente.setCnpj(cnpj);
        agente.setTipo(tipo);
        usuarioRepository.save(agente);
    }
}
