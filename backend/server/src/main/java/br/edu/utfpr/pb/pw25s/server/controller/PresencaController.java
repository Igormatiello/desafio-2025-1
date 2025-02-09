package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CursoAulaDTO;
import br.edu.utfpr.pb.pw25s.server.dto.PresencaDTO;
import br.edu.utfpr.pb.pw25s.server.model.CursoAula;
import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import br.edu.utfpr.pb.pw25s.server.model.EstudanteCurso;
import br.edu.utfpr.pb.pw25s.server.service.impl.PresencaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/presencas")
public class PresencaController {

    @Autowired
    private PresencaServiceImpl presencaService;

    // Lançar presença para um aluno no curso aula
    @PostMapping
    public ResponseEntity<CursoPresenca> registrarPresenca(@RequestBody CursoPresenca presenca) {
        return ResponseEntity.ok(presencaService.registrarPresenca(presenca));
    }

    @PostMapping("/curso-aula")
    public ResponseEntity<CursoAula> lancarCursoAula(@RequestBody CursoAulaDTO cursoAula) {
        CursoAula novaAula = presencaService.salvarCursoAula(cursoAula);
        return ResponseEntity.ok(novaAula);
    }

    // Listar todas as presenças do aluno em um curso aula
    @GetMapping("/{cursoAulaId}/{estudanteId}")
    public ResponseEntity<List<CursoPresenca>> listarPresencas(@PathVariable Long cursoAulaId, @PathVariable Long estudanteId) {
        return ResponseEntity.ok(presencaService.listarPresencasDoAluno(cursoAulaId, estudanteId));
    }

    // Editar a presença do aluno no curso aula
    @PutMapping("/{id}")
    public ResponseEntity<CursoPresenca> editarPresenca(@PathVariable Long id, @RequestBody CursoPresenca presenca) {
        return ResponseEntity.ok(presencaService.editarPresenca(id, presenca));
    }

    // Lançar presenças para uma lista de alunos em um curso aula
    @PostMapping("/lancar")
    public ResponseEntity<Void> lancarPresencas(@RequestParam Long cursoAulaId, @RequestBody List<Long> estudantesIds) {
        presencaService.lancarPresencas(cursoAulaId, estudantesIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/curso-aula/{cursoAulaId}/alunos-presentes")
    public ResponseEntity<List<EstudanteCurso>> listarAlunosPresentesNoCursoAula(@PathVariable Long cursoAulaId) {
        return ResponseEntity.ok(presencaService.listarAlunosPresentesNoCursoAula(cursoAulaId));
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<CursoAula>> listarAulasDoCurso(@PathVariable Long cursoId) {
        return ResponseEntity.ok(presencaService.listarAulasDoCurso(cursoId));
    }

    @GetMapping("/curso/{cursoId}/minhas-presencas")
    public ResponseEntity<List<Date>> listarMinhasPresencasNoCurso(@PathVariable Long cursoId) {
        return ResponseEntity.ok(presencaService.listarDatasPresencaDoAlunoNoCurso(cursoId));
    }




}