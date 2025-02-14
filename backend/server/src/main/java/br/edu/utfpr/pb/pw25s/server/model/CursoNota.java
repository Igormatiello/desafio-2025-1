package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "curso_nota")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CursoNota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curso_avaliacao_id", nullable = false)
    private CursoAvaliacao curso;

    @ManyToOne
    @JoinColumn(name = "estudante_curso_id", nullable = false)
    private Pessoa estudante;

    @Column(nullable = false)
    private Double nota;
}