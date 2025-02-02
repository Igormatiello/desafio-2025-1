package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.service.impl.PessoaServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


    @RestController
    @RequestMapping("/pessoa")
    public class PessoaController {

        private final PessoaServiceImpl pessoaService;


        public PessoaController(PessoaServiceImpl pessoaService, UserService userService) {
            this.pessoaService = pessoaService;
        }

        @PostMapping("/endereco")
        public ResponseEntity<String> salvarEndereco(@RequestBody PessoaEndereco endereco) {


            return ResponseEntity.ok("Endereço salvo com sucesso.");
        }
    }


