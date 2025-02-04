package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.User;
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
    @Size(min = 1, max = 1)
    private String tipo;

    @NotNull
    private Boolean ativo;

    @NotNull
    @Size(min = 11, max = 11)
    private String cpf;

    public static CreatePessoaDTO fromUserAndPessoa(User user, Pessoa pessoa) {
        return new CreatePessoaDTO(
                user.getUsername(),
                user.getPassword(),
                pessoa.getNome(),
                pessoa.getEmail(),
                pessoa.getTelefone(),
                pessoa.getTipo(),
                pessoa.getAtivo(),
                pessoa.getCpf()
        );
    }
}