package br.edu.utfpr.pb.pw25s.server.controller;


import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.EstudanteCurso;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
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

    @GetMapping("/ativos")
    public ResponseEntity<List<Curso>> listarCursosAtivos() {
        return ResponseEntity.ok(cursoService.listarCursosAtivos());
    }

    @PostMapping("/{cursoId}/entrar")
    public ResponseEntity<EstudanteCurso> entrarNoCurso(@PathVariable Long cursoId) {
        return ResponseEntity.ok(cursoService.entrarNoCurso(cursoId));
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

    @GetMapping("/meus-cursos")
    public ResponseEntity<List<Curso>> listarMeusCursos() {
        return ResponseEntity.ok(cursoService.listarMeusCursos());
    }


    @GetMapping("/meus-cursos_estudante")
    public ResponseEntity<List<Curso>> listarMeusCursosEstudante() {
        return ResponseEntity.ok(cursoService.listarMeusCursosEstudantes());
    }


    @PostMapping("/{cursoId}/associar-professor")
    public ResponseEntity<ProfessorCurso> associarProfessorCurso(@PathVariable Long cursoId) {
        return ResponseEntity.ok(cursoService.associarProfessorCurso( cursoId));
    }

    @DeleteMapping("/{cursoId}/desassociar-professor")
    public ResponseEntity<Void> desassociarProfessorCurso(@PathVariable Long cursoId) {
        cursoService.desassociarProfessorCurso(cursoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{cursoId}/alunos")
    public ResponseEntity<List<Pessoa>> listarAlunosDoCurso(@PathVariable Long cursoId) {
        List<Pessoa> alunos = cursoService.listarAlunosDoCurso(cursoId);
        return ResponseEntity.ok(alunos);
    }


}
