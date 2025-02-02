package br.edu.utfpr.pb.pw25s.server.controller;


import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.ProfessorCurso;
import br.edu.utfpr.pb.pw25s.server.service.impl.CursoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoServiceImpl cursoService;

    // Método para criar um curso
    @PostMapping
    public ResponseEntity<Curso> criarCurso(@RequestBody Curso curso) {
        return ResponseEntity.ok(cursoService.criarCurso(curso));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> editarCurso(@PathVariable Long id, @RequestBody Curso curso) {
        return ResponseEntity.ok(cursoService.editarCurso(id, curso));
    }

    @GetMapping
    public ResponseEntity<List<Curso>> listarCursos() {
        return ResponseEntity.ok(cursoService.listarCursos());
    }

    @PutMapping("/{id}/desativar")
    public ResponseEntity<Curso> desativarCurso(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.desativarCurso(id));
    }

    @GetMapping("/sem-professor")
    public ResponseEntity<List<Curso>> listarCursosSemProfessor() {
        return ResponseEntity.ok(cursoService.listarCursosSemProfessor());
    }

    @PostMapping("/{cursoId}/associar-professor/{professorId}")
    public ResponseEntity<ProfessorCurso> associarProfessorCurso(@PathVariable Long cursoId, @PathVariable Long professorId) {
        return ResponseEntity.ok(cursoService.associarProfessorCurso( cursoId));
    }

}
