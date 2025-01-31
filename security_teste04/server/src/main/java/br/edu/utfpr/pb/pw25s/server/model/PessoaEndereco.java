package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pessoa_endereco")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PessoaEndereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pessoa_id", nullable = false)
    private Pessoa pessoa;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private Integer numero;
}
