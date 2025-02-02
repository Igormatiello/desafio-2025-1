package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.EstudanteCurso;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EstudanteCursoRepository extends JpaRepository<EstudanteCurso, Long> {
    boolean existsByEstudanteAndCurso(Pessoa estudante, Curso curso);
    List<EstudanteCurso> findByCurso(Curso curso);

    @Query("SELECT ec FROM EstudanteCurso ec WHERE ec.curso.id = :cursoId AND ec.estudante.id = :estudanteId")
    Optional<EstudanteCurso> findByCursoIdAndEstudanteId(@Param("cursoId") Long cursoId, @Param("estudanteId") Long estudanteId);

}
