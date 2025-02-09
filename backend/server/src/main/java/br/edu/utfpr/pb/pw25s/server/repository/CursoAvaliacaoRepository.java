package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.CursoAula;
import br.edu.utfpr.pb.pw25s.server.model.CursoAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoAvaliacaoRepository  extends JpaRepository<CursoAvaliacao, Long> {
    List<CursoAvaliacao> findByCursoId(Long cursoId);

}
