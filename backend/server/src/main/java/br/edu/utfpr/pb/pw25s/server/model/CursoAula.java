package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "curso_aula")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CursoAula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;

    @Column(nullable = false)
    private Date data;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;


}
