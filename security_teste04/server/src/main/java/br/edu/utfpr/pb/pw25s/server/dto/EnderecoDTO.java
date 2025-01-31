package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EnderecoDTO {
    private String cidade;

    private String cep;

    private String rua;

    private Integer numero;

}
