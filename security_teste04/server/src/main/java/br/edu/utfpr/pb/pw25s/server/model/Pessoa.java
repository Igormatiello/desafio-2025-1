package br.edu.utfpr.pb.pw25s.server.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "pessoa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private Boolean ativo;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @OneToOne(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
    private PessoaEndereco endereco;

    @OneToMany(mappedBy = "estudante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstudanteCurso> cursosMatriculados = List.of();

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProfessorCurso> cursosLecionados = List.of();

    // Construtor com os parâmetros necessários
    public Pessoa(String cpf, Boolean ativo, User user, String nome, String email, String telefone) {
        this.cpf = cpf;
        this.ativo = ativo;
        this.user = user;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}
