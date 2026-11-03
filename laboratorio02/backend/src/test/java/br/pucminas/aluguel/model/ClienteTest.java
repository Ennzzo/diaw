package br.pucminas.aluguel.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ClienteTest {

    @Test
    void naoDeixaAdicionarMaisDeTresRendimentos() {
        Cliente cliente = new Cliente();
        cliente.adicionarRendimento(new Rendimento("Empresa A", new BigDecimal("1000")));
        cliente.adicionarRendimento(new Rendimento("Empresa B", new BigDecimal("2000")));
        cliente.adicionarRendimento(new Rendimento("Empresa C", new BigDecimal("500")));

        assertThrows(IllegalArgumentException.class,
                () -> cliente.adicionarRendimento(new Rendimento("Empresa D", new BigDecimal("100"))));
        assertEquals(3, cliente.getRendimentos().size());
    }

    @Test
    void somaARendaTotal() {
        Cliente cliente = new Cliente();
        cliente.adicionarRendimento(new Rendimento("Empresa A", new BigDecimal("1000.50")));
        cliente.adicionarRendimento(new Rendimento("Empresa B", new BigDecimal("2000")));

        assertEquals(new BigDecimal("3000.50"), cliente.getRendaTotal());
    }
}
