package br.edu.utfpr.pb.pw25s.server.shared;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class GenericResponse {


    private String message;
    private Object data;

    // Construtor para inicializar apenas a mensagem
    public GenericResponse(String message) {
        this.message = message;
        this.data = null;  // Pode ser null caso não haja dados
    }

    // Construtor para inicializar tanto a mensagem quanto os dados
    public GenericResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}