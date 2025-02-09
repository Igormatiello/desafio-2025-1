package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class CursoAulaDTO {
    private Long cursoId; // Recebe apenas o cursoId
    private String titulo;
    private String descricao;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date data;
}