package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.ClienteRequest;
import br.pucminas.aluguel.dto.ClienteResponse;
import br.pucminas.aluguel.dto.RendimentoDTO;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.Cliente;
import br.pucminas.aluguel.repository.ClienteRepository;
import br.pucminas.aluguel.repository.UsuarioRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ClienteService")
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ClienteService clienteService;

    private ClienteRequest requisicao(String senha) {
        return new ClienteRequest("Joao", "joao", senha, "MG1", "12345678901", "Rua A", "Analista",
                List.of(new RendimentoDTO("Empresa X", new BigDecimal("3000"))));
    }

    @Test
    void criaClienteComSenhaCriptografada() {
        when(passwordEncoder.encode("1234")).thenReturn("hash");
        when(clienteRepository.save(any(Cliente.class))).thenAnswer(inv -> inv.getArgument(0));

        ClienteResponse resposta = clienteService.criar(requisicao("1234"));

        ArgumentCaptor<Cliente> salvo = ArgumentCaptor.forClass(Cliente.class);
        verify(clienteRepository).save(salvo.capture());
        assertEquals("hash", salvo.getValue().getSenha());
        assertEquals(1, resposta.rendimentos().size());
    }

    @Test
    void naoCriaClienteComLoginRepetido() {
        when(usuarioRepository.existsByLogin("joao")).thenReturn(true);

        assertThrows(RegraNegocioException.class, () -> clienteService.criar(requisicao("1234")));
        verify(clienteRepository, never()).save(any());
    }

    @Test
    void naoCriaClienteComCpfRepetido() {
        when(clienteRepository.existsByCpf("12345678901")).thenReturn(true);

        assertThrows(RegraNegocioException.class, () -> clienteService.criar(requisicao("1234")));
    }

    @Test
    void naoCriaClienteComSenhaCurta() {
        assertThrows(RegraNegocioException.class, () -> clienteService.criar(requisicao("12")));
    }

    @Test
    void buscarClienteInexistenteLancaExcecao() {
        when(clienteRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NaoEncontradoException.class, () -> clienteService.buscar(99L));
    }
}
