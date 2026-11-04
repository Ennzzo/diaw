package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.AvaliacaoRequest;
import br.pucminas.aluguel.dto.PedidoRequest;
import br.pucminas.aluguel.dto.PedidoResponse;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.*;
import br.pucminas.aluguel.repository.PedidoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PedidoService")
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private AutomovelService automovelService;

    @InjectMocks
    private PedidoService pedidoService;

    private Cliente cliente;
    private Automovel automovel;

    @BeforeEach
    void setUp() {
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Maria");

        automovel = new Automovel();
        automovel.setId(10L);
        automovel.setMarca("Fiat");
        automovel.setModelo("Argo");
    }

    private Pedido pedidoDoCliente(StatusPedido status) {
        Pedido pedido = new Pedido();
        pedido.setId(5L);
        pedido.setCliente(cliente);
        pedido.setAutomovel(automovel);
        pedido.setDataInicio(LocalDate.now().plusDays(1));
        pedido.setDataFim(LocalDate.now().plusDays(3));
        pedido.setStatus(status);
        return pedido;
    }

    @Test
    void criaPedidoPendente() {
        when(automovelService.buscar(10L)).thenReturn(automovel);
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(inv -> inv.getArgument(0));

        PedidoRequest dados = new PedidoRequest(10L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(4));
        PedidoResponse resposta = pedidoService.criar(dados, cliente);

        assertEquals(StatusPedido.PENDENTE, resposta.status());
        assertEquals("Maria", resposta.clienteNome());
    }

    @Test
    void naoCriaPedidoComDataFimAntesDoInicio() {
        PedidoRequest dados = new PedidoRequest(10L, LocalDate.now().plusDays(5), LocalDate.now().plusDays(2));

        assertThrows(RegraNegocioException.class, () -> pedidoService.criar(dados, cliente));
        verify(pedidoRepository, never()).save(any());
    }

    @Test
    void clienteNaoVePedidoDeOutroCliente() {
        Cliente outro = new Cliente();
        outro.setId(2L);
        when(pedidoRepository.findById(5L)).thenReturn(Optional.of(pedidoDoCliente(StatusPedido.PENDENTE)));

        assertThrows(AccessDeniedException.class, () -> pedidoService.buscar(5L, outro));
    }

    @Test
    void naoCancelaPedidoContratado() {
        when(pedidoRepository.findById(5L)).thenReturn(Optional.of(pedidoDoCliente(StatusPedido.CONTRATADO)));

        assertThrows(RegraNegocioException.class, () -> pedidoService.cancelar(5L, cliente));
    }

    @Test
    void agenteAprovaPedidoPendente() {
        Agente agente = new Agente();
        agente.setId(3L);
        agente.setNome("Locadora");
        when(pedidoRepository.findById(5L)).thenReturn(Optional.of(pedidoDoCliente(StatusPedido.PENDENTE)));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(inv -> inv.getArgument(0));

        PedidoResponse resposta = pedidoService.avaliar(5L, new AvaliacaoRequest(true, "Renda ok"), agente);

        assertEquals(StatusPedido.APROVADO, resposta.status());
        assertEquals("Locadora", resposta.avaliadoPor());
    }

    @Test
    void naoAvaliaPedidoJaAvaliado() {
        Agente agente = new Agente();
        when(pedidoRepository.findById(5L)).thenReturn(Optional.of(pedidoDoCliente(StatusPedido.REPROVADO)));

        assertThrows(RegraNegocioException.class,
                () -> pedidoService.avaliar(5L, new AvaliacaoRequest(true, "ok"), agente));
    }
}
