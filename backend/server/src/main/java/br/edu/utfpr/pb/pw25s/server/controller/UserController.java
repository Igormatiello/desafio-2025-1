package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CreatePessoaDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.service.impl.PessoaServiceImpl;
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

    private final PessoaServiceImpl pessoaService;


    private final UserRepository userRepository;




    public UserController(UserService userService, PessoaServiceImpl pessoaService, UserRepository userRepository) {
        this.userService = userService;
        this.pessoaService = pessoaService;
        this.userRepository = userRepository;

    }@PostMapping
    public GenericResponse createUser(@RequestBody CreatePessoaDTO createPessoaDTO) {
        userService.createUser(createPessoaDTO);
        return GenericResponse.builder().message("User and person saved.").build();
    }

    @PutMapping("/edit")
    public GenericResponse editUserAndPessoa(@RequestBody CreatePessoaDTO createPessoaDTO) {
        userService.editUserAndPessoa(createPessoaDTO);
        return GenericResponse.builder().message("User and person updated.").build();
    }
    @GetMapping("/tipo")
    public ResponseEntity<String> getTipoPessoa() {
        String tipo = userService.getTipoDoUsuario();
        return ResponseEntity.ok(tipo);
    }



    @GetMapping("/profile")
    public ResponseEntity<GenericResponse> getUserProfile() {
        var userProfile = userService.getUserProfile(); // Supondo que esse método retorne o perfil do usuário.
        return ResponseEntity.ok(new GenericResponse("User and person found.", userProfile));
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