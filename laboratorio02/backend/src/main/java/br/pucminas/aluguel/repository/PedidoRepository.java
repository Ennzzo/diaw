package br.pucminas.aluguel.repository;

import br.pucminas.aluguel.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteIdOrderByDataCriacaoDesc(Long clienteId);

    List<Pedido> findAllByOrderByDataCriacaoDesc();
}
