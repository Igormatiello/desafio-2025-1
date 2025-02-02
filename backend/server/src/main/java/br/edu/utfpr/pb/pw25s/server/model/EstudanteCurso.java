package br.edu.utfpr.pb.pw25s.server.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "estudante_curso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstudanteCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "estudante_id", nullable = false)
    private Pessoa estudante;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;
}