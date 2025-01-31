package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CreatePessoaDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.IPessoaService;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    private final IPessoaService pessoaService;


    private final UserRepository userRepository;




    public UserController(UserService userService, IPessoaService pessoaService, UserRepository userRepository) {
        this.userService = userService;
        this.pessoaService = pessoaService;
        this.userRepository = userRepository;

    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody CreatePessoaDTO createPessoaDTO) {

        // Criação do usuário
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        GoogleAuthenticatorKey key = gAuth.createCredentials();

        User user = User.builder()
                .username(createPessoaDTO.getUsername())
                .password(createPessoaDTO.getPassword())  // Lembre-se de aplicar hash na senha antes de salvar!
                .displayName(createPessoaDTO.getNome())   // Exibindo o nome no campo displayName
                .secret(key.getKey())
                .build();

        userService.save(user);  // Salva o usuário

        // Criação da pessoa
        Pessoa pessoa = Pessoa.builder()
                .cpf(createPessoaDTO.getCpf())
                .ativo(createPessoaDTO.getAtivo())
                .user(user)  // Associa o usuário recém-criado
                .nome(createPessoaDTO.getNome())
                .email(createPessoaDTO.getEmail())
                .telefone(createPessoaDTO.getTelefone())
                .build();

        pessoaService.save(pessoa);  // Salva a pessoa

        return GenericResponse.builder().message("User and person saved.").build();
    }



    @GetMapping("/validateToken")
    public ResponseEntity<GenericResponse> validateToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(new GenericResponse("Token is valid."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericResponse("Invalid token."));
    }

}