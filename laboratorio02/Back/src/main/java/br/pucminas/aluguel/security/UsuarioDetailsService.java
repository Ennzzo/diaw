package br.pucminas.aluguel.security;

import br.pucminas.aluguel.model.Agente;
import br.pucminas.aluguel.model.TipoAgente;
import br.pucminas.aluguel.model.Usuario;
import br.pucminas.aluguel.repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario nao encontrado"));

        List<SimpleGrantedAuthority> permissoes = new ArrayList<>();
        permissoes.add(new SimpleGrantedAuthority("ROLE_" + usuario.getPerfil()));
        if (usuario instanceof Agente agente && agente.getTipo() == TipoAgente.BANCO) {
            permissoes.add(new SimpleGrantedAuthority("ROLE_BANCO"));
        }

        return new User(usuario.getLogin(), usuario.getSenha(), permissoes);
    }
}
