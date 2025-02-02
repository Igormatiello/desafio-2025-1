package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import br.edu.utfpr.pb.pw25s.server.service.impl.PresencaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/presencas")
public class PresencaController {

    @Autowired
    private PresencaServiceImpl presencaService;

    // Lançar presença para um aluno no curso
    @PostMapping
    public ResponseEntity<CursoPresenca> registrarPresenca(@RequestBody CursoPresenca presenca) {
        return ResponseEntity.ok(presencaService.registrarPresenca(presenca));
    }

    // Listar todas as presenças do aluno em um curso
    @GetMapping("/{cursoId}/{estudanteId}")
    public ResponseEntity<List<CursoPresenca>> listarPresencas(@PathVariable Long cursoId, @PathVariable Long estudanteId) {
        return ResponseEntity.ok(presencaService.listarPresencasDoAluno(cursoId, estudanteId));
    }

    // Editar a presença do aluno no curso
    @PutMapping("/{id}")
    public ResponseEntity<CursoPresenca> editarPresenca(@PathVariable Long id, @RequestBody CursoPresenca presenca) {
        return ResponseEntity.ok(presencaService.editarPresenca(id, presenca));
    }
}