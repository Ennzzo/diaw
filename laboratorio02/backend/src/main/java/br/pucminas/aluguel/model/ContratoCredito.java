package br.pucminas.aluguel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "contratos_credito")
@Getter
@Setter
@NoArgsConstructor
public class ContratoCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "contrato_id", unique = true)
    private Contrato contrato;

    @ManyToOne(optional = false)
    @JoinColumn(name = "banco_id")
    private Agente banco;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private BigDecimal taxaJuros;

    @Column(nullable = false)
    private Integer parcelas;

    private LocalDate dataConcessao = LocalDate.now();
}
