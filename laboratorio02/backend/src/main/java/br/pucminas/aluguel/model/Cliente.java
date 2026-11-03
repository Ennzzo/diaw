package br.pucminas.aluguel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
