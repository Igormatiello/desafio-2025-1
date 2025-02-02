package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professor_curso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessorCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Pessoa professor;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;
}
