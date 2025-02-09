package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PresencaDTO {
    private Long id;
    private Date data;
    private Long cursoAulaId;

    public PresencaDTO(Long id, Date data, Long cursoAulaId) {
        this.id = id;
        this.data = data;
        this.cursoAulaId = cursoAulaId;
    }

}
