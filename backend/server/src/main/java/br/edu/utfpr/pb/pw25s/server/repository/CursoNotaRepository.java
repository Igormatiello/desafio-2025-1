package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.CursoNota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursoNotaRepository extends JpaRepository<CursoNota, Long> {

    // Busca todas as notas de um estudante em um curso específico
    List<CursoNota> findByEstudanteIdAndCursoId(Long estudanteId, Long cursoId);

    // Busca uma nota específica por estudante e curso (para edições)
    Optional<CursoNota> findByEstudanteIdAndCursoIdAndId(Long estudanteId, Long cursoId, Long notaId);

    List<CursoNota> findByEstudanteId(Long estudanteId);

}
