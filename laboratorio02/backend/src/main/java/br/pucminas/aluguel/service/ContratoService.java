package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.ContratoRequest;
import br.pucminas.aluguel.dto.CreditoRequest;
import br.pucminas.aluguel.dto.PedidoResponse;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.*;
import br.pucminas.aluguel.repository.ContratoRepository;
import br.pucminas.aluguel.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContratoService {

    private final PedidoRepository pedidoRepository;
    private final ContratoRepository contratoRepository;

    public ContratoService(PedidoRepository pedidoRepository, ContratoRepository contratoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.contratoRepository = contratoRepository;
    }

    @Transactional
    public PedidoResponse executarContrato(Long pedidoId, ContratoRequest dados) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NaoEncontradoException("Pedido nao encontrado"));
        if (pedido.getStatus() != StatusPedido.APROVADO) {
            throw new RegraNegocioException("So pedidos aprovados podem virar contrato");
        }

        Contrato contrato = new Contrato();
        contrato.setPedido(pedido);
        contrato.setProprietario(dados.proprietario());
        contratoRepository.save(contrato);

        pedido.setContrato(contrato);
        pedido.setStatus(StatusPedido.CONTRATADO);
        pedido.getAutomovel().setProprietario(dados.proprietario());
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse concederCredito(Long pedidoId, CreditoRequest dados, Agente banco) {
        if (banco.getTipo() != TipoAgente.BANCO) {
            throw new RegraNegocioException("Somente bancos podem conceder credito");
        }
        Contrato contrato = contratoRepository.findByPedidoId(pedidoId)
                .orElseThrow(() -> new RegraNegocioException("O pedido ainda nao tem contrato"));
        if (contrato.getCredito() != null) {
            throw new RegraNegocioException("Esse contrato ja possui credito");
        }

        ContratoCredito credito = new ContratoCredito();
        credito.setContrato(contrato);
        credito.setBanco(banco);
        credito.setValor(dados.valor());
        credito.setTaxaJuros(dados.taxaJuros());
        credito.setParcelas(dados.parcelas());
        contrato.setCredito(credito);
        contratoRepository.save(contrato);

        return PedidoResponse.from(contrato.getPedido());
    }
}
