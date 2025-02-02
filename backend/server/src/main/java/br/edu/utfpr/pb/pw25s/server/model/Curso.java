package br.edu.utfpr.pb.pw25s.server.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "curso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String assunto;

    @Column(nullable = false)
    private Integer encontros;

    @Column(nullable = false)
    private String status; // ATIVO ou INATIVO
}

