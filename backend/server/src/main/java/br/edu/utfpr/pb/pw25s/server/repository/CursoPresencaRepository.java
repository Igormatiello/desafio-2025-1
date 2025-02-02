package br.edu.utfpr.pb.pw25s.server.repository;


import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoPresencaRepository extends JpaRepository<CursoPresenca, Long> {

    // Buscar todas as presenças do aluno em um curso
    List<CursoPresenca> findByCursoIdAndEstudanteId(Long cursoId, Long estudanteId);
}