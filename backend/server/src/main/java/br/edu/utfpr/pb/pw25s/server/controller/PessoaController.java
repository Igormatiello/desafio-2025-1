package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.EnderecoDTO;
import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.service.impl.PessoaServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
    @RequestMapping("/pessoa")
    public class PessoaController {

        private final PessoaServiceImpl pessoaService;


        public PessoaController(PessoaServiceImpl pessoaService, UserService userService) {
            this.pessoaService = pessoaService;
        }

        @PostMapping("/endereco")
        public ResponseEntity<String> salvarOuEditarEndereco(@RequestBody EnderecoDTO enderecoDTO) {
            Boolean sucesso = pessoaService.salvarOuEditarEndereco(enderecoDTO);
            if (sucesso) {
                return ResponseEntity.ok("Endereço salvo com sucesso.");
            } else {
                return ResponseEntity.badRequest().body("Erro ao salvar o endereço.");
            }
        }

        @GetMapping("/enderecos")
        public ResponseEntity<List<PessoaEndereco>> listarEnderecos() {
            List<PessoaEndereco> enderecos = pessoaService.listarEnderecos();
            return ResponseEntity.ok(enderecos);
        }
    }


