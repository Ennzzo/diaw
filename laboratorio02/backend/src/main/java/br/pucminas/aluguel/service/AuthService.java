package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.LoginRequest;
import br.pucminas.aluguel.dto.LoginResponse;
import br.pucminas.aluguel.dto.UsuarioResponse;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.model.Usuario;
import br.pucminas.aluguel.repository.UsuarioRepository;
import br.pucminas.aluguel.security.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest dados) {
        Usuario usuario = usuarioRepository.findByLogin(dados.login())
                .filter(u -> passwordEncoder.matches(dados.senha(), u.getSenha()))
                .orElseThrow(() -> new BadCredentialsException("Usuario ou senha invalidos"));

        return new LoginResponse(jwtService.gerarToken(usuario.getLogin()), UsuarioResponse.from(usuario));
    }

    public Usuario usuarioLogado(String login) {
        return usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new NaoEncontradoException("Usuario nao encontrado"));
    }
}
