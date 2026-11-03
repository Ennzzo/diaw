package br.pucminas.aluguel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
public class Cliente extends Usuario {

    @Column(nullable = false)
    private String rg;

    @Column(nullable = false, unique = true)
    private String cpf;

    private String endereco;

    private String profissao;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rendimento> rendimentos = new ArrayList<>();

    public static final int MAX_RENDIMENTOS = 3;

    @Override
    public String getPerfil() {
        return "CLIENTE";
    }

    public BigDecimal getRendaTotal() {
        return rendimentos.stream().map(Rendimento::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void adicionarRendimento(Rendimento rendimento) {
        if (rendimentos.size() >= MAX_RENDIMENTOS) {
            throw new IllegalArgumentException("O cliente pode ter no maximo 3 rendimentos");
        }
        rendimento.setCliente(this);
        rendimentos.add(rendimento);
    }
}
