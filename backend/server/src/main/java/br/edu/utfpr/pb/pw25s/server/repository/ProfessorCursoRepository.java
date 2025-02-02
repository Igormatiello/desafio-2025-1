package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.ProfessorCurso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfessorCursoRepository extends JpaRepository<ProfessorCurso, Long> {
    boolean existsByCursoId(Long cursoId);
    Optional<ProfessorCurso> findByProfessorAndCursoId(Pessoa professor, Long cursoId);
    List<ProfessorCurso> findByProfessor(Pessoa professor);

}
