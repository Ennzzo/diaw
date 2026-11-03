package br.pucminas.aluguel.dto;

import br.pucminas.aluguel.model.Contrato;
import br.pucminas.aluguel.model.ContratoCredito;
import br.pucminas.aluguel.model.TipoProprietario;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ContratoResponse(
        Long id,
        TipoProprietario proprietario,
        LocalDate dataAssinatura,
        String banco,
        BigDecimal valorCredito,
        BigDecimal taxaJuros,
        Integer parcelas
) {
    public static ContratoResponse from(Contrato c) {
        if (c == null) {
            return null;
        }
        ContratoCredito cr = c.getCredito();
        if (cr == null) {
            return new ContratoResponse(c.getId(), c.getProprietario(), c.getDataAssinatura(), null, null, null, null);
        }
        return new ContratoResponse(c.getId(), c.getProprietario(), c.getDataAssinatura(),
                cr.getBanco().getNome(), cr.getValor(), cr.getTaxaJuros(), cr.getParcelas());
    }
}
