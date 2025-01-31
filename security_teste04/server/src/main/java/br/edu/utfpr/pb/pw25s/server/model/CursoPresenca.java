package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "curso_presenca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CursoPresenca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "estudante_curso_id", nullable = false)
    private EstudanteCurso estudante;

    @Column(nullable = false)
    private Integer presenca;
}