package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.CursoNota;
import br.edu.utfpr.pb.pw25s.server.service.impl.NotaServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notas")
public class NotasController {

    private final NotaServiceImpl notaService;

    public NotasController(NotaServiceImpl notaService) {
        this.notaService = notaService;
    }

    @PostMapping("/lancar")
    public ResponseEntity<CursoNota> lancarNota(@RequestParam Long cursoId, @RequestParam Long estudanteId, @RequestParam Double nota) {
        CursoNota cursoNota = notaService.lancarNota(cursoId, estudanteId, nota);
        return ResponseEntity.ok(cursoNota);
    }

    @GetMapping("/listar/{cursoId}/{estudanteId}")
    public ResponseEntity<List<CursoNota>> listarNotasAluno(@PathVariable Long cursoId, @PathVariable Long estudanteId) {
        List<CursoNota> notas = notaService.listarNotasAluno(cursoId, estudanteId);
        return ResponseEntity.ok(notas);
    }

    @PutMapping("/editar/{notaId}")
    public ResponseEntity<CursoNota> editarNota(@PathVariable Long notaId, @RequestParam Double novaNota) {
        CursoNota cursoNota = notaService.editarNota(notaId, novaNota);
        return ResponseEntity.ok(cursoNota);
    }
}
