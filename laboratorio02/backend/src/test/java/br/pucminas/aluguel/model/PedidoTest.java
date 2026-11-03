package br.pucminas.aluguel.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PedidoTest {

    @Test
    void pedidoNovoComecaPendente() {
        Pedido pedido = new Pedido();
        assertEquals(StatusPedido.PENDENTE, pedido.getStatus());
        assertTrue(pedido.podeSerAlterado());
        assertTrue(pedido.podeSerCancelado());
    }

    @Test
    void pedidoAprovadoPodeSerCanceladoMasNaoAlterado() {
        Pedido pedido = new Pedido();
        pedido.setStatus(StatusPedido.APROVADO);
        assertFalse(pedido.podeSerAlterado());
        assertTrue(pedido.podeSerCancelado());
    }

    @Test
    void pedidoContratadoNaoPodeSerCancelado() {
        Pedido pedido = new Pedido();
        pedido.setStatus(StatusPedido.CONTRATADO);
        assertFalse(pedido.podeSerCancelado());
    }
}
