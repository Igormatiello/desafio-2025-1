package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {

    @Query("SELECT c FROM Curso c WHERE c.id NOT IN (SELECT pc.curso.id FROM ProfessorCurso pc) and c.status = 'ATIVO'")
    List<Curso> findCursosSemProfessor();

    @Query("SELECT c FROM Curso c WHERE c.status = 'ATIVO'")
    List<Curso> findCursosAtivos();
}
