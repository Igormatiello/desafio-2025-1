package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.CursoNota;
import br.edu.utfpr.pb.pw25s.server.repository.CursoNotaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.EstudanteCursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaServiceImpl {

    private final CursoNotaRepository cursoNotaRepository;
    private final CursoRepository cursoRepository;
    private final EstudanteCursoRepository estudanteCursoRepository;

    public NotaServiceImpl(CursoNotaRepository cursoNotaRepository, CursoRepository cursoRepository, EstudanteCursoRepository estudanteCursoRepository) {
        this.cursoNotaRepository = cursoNotaRepository;
        this.cursoRepository = cursoRepository;
        this.estudanteCursoRepository = estudanteCursoRepository;
    }

    public CursoNota lancarNota(Long cursoId, Long estudanteId, Double nota) {
        var estudanteCurso = estudanteCursoRepository.findByCursoIdAndEstudanteId(cursoId, estudanteId)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado no curso"));
        CursoNota cursoNota = new CursoNota(null, estudanteCurso.getCurso(), estudanteCurso, nota);
        return cursoNotaRepository.save(cursoNota);
    }

    public List<CursoNota> listarNotasAluno(Long cursoId, Long estudanteId) {
        return cursoNotaRepository.findByEstudanteIdAndCursoId(cursoId, estudanteId);
    }

    public CursoNota editarNota(Long notaId, Double novaNota) {
        CursoNota cursoNota = cursoNotaRepository.findById(notaId)
                .orElseThrow(() -> new RuntimeException("Nota não encontrada"));
        cursoNota.setNota(novaNota);
        return cursoNotaRepository.save(cursoNota);
    }
}