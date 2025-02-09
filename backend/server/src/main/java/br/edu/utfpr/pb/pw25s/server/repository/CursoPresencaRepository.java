package br.edu.utfpr.pb.pw25s.server.repository;


import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import br.edu.utfpr.pb.pw25s.server.model.EstudanteCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CursoPresencaRepository extends JpaRepository<CursoPresenca, Long> {

    // Buscar todas as presenças do aluno em um curso aula
    List<CursoPresenca> findByCursoAulaIdAndEstudanteId(Long cursoAulaId, Long estudanteId);

    // Buscar todas as presenças de um curso aula
    List<CursoPresenca> findByCursoAulaId(Long cursoAulaId);

    @Modifying
    @Query("DELETE FROM CursoPresenca cp WHERE cp.cursoAula.id = :cursoAulaId")
    void deleteByCursoAulaId(@Param("cursoAulaId") Long cursoAulaId);

    @Query("SELECT cp.estudante FROM CursoPresenca cp WHERE cp.cursoAula.id = :cursoAulaId")
    List<EstudanteCurso> findEstudantesPresentesByCursoAulaId(@Param("cursoAulaId") Long cursoAulaId);

    @Query("SELECT c.data FROM CursoPresenca c WHERE c.estudante.estudante.id = :usuarioId AND c.cursoAula.curso.id = :cursoId")
    List<Date> findDatas(@Param("usuarioId") Long usuarioId, @Param("cursoId") Long cursoId);

}