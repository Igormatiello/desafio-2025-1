package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
