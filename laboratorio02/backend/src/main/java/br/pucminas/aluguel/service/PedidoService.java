package br.pucminas.aluguel.service;

import br.pucminas.aluguel.dto.PedidoRequest;
import br.pucminas.aluguel.dto.PedidoResponse;
import br.pucminas.aluguel.exception.NaoEncontradoException;
import br.pucminas.aluguel.exception.RegraNegocioException;
import br.pucminas.aluguel.model.*;
import br.pucminas.aluguel.repository.PedidoRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final AutomovelService automovelService;

    public PedidoService(PedidoRepository pedidoRepository, AutomovelService automovelService) {
        this.pedidoRepository = pedidoRepository;
        this.automovelService = automovelService;
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listar(Usuario usuario) {
        List<Pedido> pedidos = usuario instanceof Cliente
                ? pedidoRepository.findByClienteIdOrderByDataCriacaoDesc(usuario.getId())
                : pedidoRepository.findAllByOrderByDataCriacaoDesc();
        return pedidos.stream().map(PedidoResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public PedidoResponse buscar(Long id, Usuario usuario) {
        return PedidoResponse.from(buscarPedido(id, usuario));
    }

    @Transactional
    public PedidoResponse criar(PedidoRequest dados, Cliente cliente) {
        validarDatas(dados);
        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setAutomovel(automovelService.buscar(dados.automovelId()));
        pedido.setDataInicio(dados.dataInicio());
        pedido.setDataFim(dados.dataFim());
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse atualizar(Long id, PedidoRequest dados, Usuario usuario) {
        Pedido pedido = buscarPedido(id, usuario);
        if (!pedido.podeSerAlterado()) {
            throw new RegraNegocioException("So pedidos pendentes podem ser modificados");
        }
        validarDatas(dados);
        pedido.setAutomovel(automovelService.buscar(dados.automovelId()));
        pedido.setDataInicio(dados.dataInicio());
        pedido.setDataFim(dados.dataFim());
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse cancelar(Long id, Usuario usuario) {
        Pedido pedido = buscarPedido(id, usuario);
        if (!pedido.podeSerCancelado()) {
            throw new RegraNegocioException("Esse pedido nao pode mais ser cancelado");
        }
        pedido.setStatus(StatusPedido.CANCELADO);
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }

    // cliente so pode ver os proprios pedidos, agente ve todos
    private Pedido buscarPedido(Long id, Usuario usuario) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Pedido nao encontrado"));
        if (usuario instanceof Cliente && !pedido.getCliente().getId().equals(usuario.getId())) {
            throw new AccessDeniedException("Esse pedido nao e seu");
        }
        return pedido;
    }

    private void validarDatas(PedidoRequest dados) {
        if (dados.dataFim().isBefore(dados.dataInicio())) {
            throw new RegraNegocioException("A data de fim nao pode ser antes da data de inicio");
        }
    }
}
