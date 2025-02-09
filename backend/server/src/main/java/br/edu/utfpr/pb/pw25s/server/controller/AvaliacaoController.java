package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.CursoAvaliacao;
import br.edu.utfpr.pb.pw25s.server.model.CursoNota;
import br.edu.utfpr.pb.pw25s.server.service.impl.AvaliacaoServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
public class AvaliacaoController {
    private final AvaliacaoServiceImpl avaliacaoService;

    public AvaliacaoController(AvaliacaoServiceImpl avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping("/criar")
    public ResponseEntity<CursoAvaliacao> criarAvaliacao(@RequestParam Long cursoId, @RequestParam String descricao, @RequestParam String data) {
        return ResponseEntity.ok(avaliacaoService.criarAvaliacao(cursoId, descricao, data));
    }

    @PostMapping("/lancar-nota")
    public ResponseEntity<CursoNota> lancarNota(@RequestParam Long avaliacaoId, @RequestParam Long alunoId, @RequestParam Double nota) {
        return ResponseEntity.ok(avaliacaoService.lancarNota(avaliacaoId, alunoId, nota));
    }

    @DeleteMapping("/deletar-nota/{notaId}")
    public ResponseEntity<Void> deletarNota(@PathVariable Long notaId) {
        avaliacaoService.deletarNota(notaId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/listar-avaliacoes/{cursoId}")
    public ResponseEntity<List<CursoAvaliacao>> listarAvaliacoesPorCurso(@PathVariable Long cursoId) {
        return ResponseEntity.ok(avaliacaoService.listarAvaliacoesPorCurso(cursoId));
    }

    @GetMapping("/listar-notas/{alunoId}")
    public ResponseEntity<List<CursoNota>> listarNotasPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(avaliacaoService.listarNotasPorAluno(alunoId));
    }
}