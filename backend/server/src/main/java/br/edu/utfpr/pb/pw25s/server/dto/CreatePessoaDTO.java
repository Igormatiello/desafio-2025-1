package br.edu.utfpr.pb.pw25s.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePessoaDTO {

    @NotNull
    @Size(min = 4, max = 255)
    private String username;

    @NotNull
    @Size(min = 6, max = 255)
    private String password;

    @NotNull
    @Size(min = 3, max = 255)
    private String nome;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 10, max = 15)
    private String telefone;

    @NotNull
    private Boolean ativo;

    @NotNull
    @Size(min = 11, max = 11)
    private String cpf;
}