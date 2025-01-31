package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.service.IPessoaService;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


    @RestController
    @RequestMapping("/pessoa")
    public class PessoaController {

        private final IPessoaService pessoaService;


        public PessoaController(IPessoaService pessoaService, UserService userService) {
            this.pessoaService = pessoaService;
        }

        @PostMapping("/endereco")
        public ResponseEntity<String> salvarEndereco(@RequestBody PessoaEndereco endereco) {




            return ResponseEntity.ok("Endereço salvo com sucesso.");
        }
    }


