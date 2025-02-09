package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.CursoAula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoAulaRepository extends JpaRepository<CursoAula, Long> {
    List<CursoAula> findByCursoId(Long cursoId);

}
