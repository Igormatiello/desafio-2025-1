package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.dto.CursoAulaDTO;
import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.CursoAula;
import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import br.edu.utfpr.pb.pw25s.server.model.EstudanteCurso;
import br.edu.utfpr.pb.pw25s.server.repository.CursoAulaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.CursoPresencaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PresencaServiceImpl {

    @Autowired
    private CursoPresencaRepository presencaRepository;

    @Autowired
    private CursoAulaRepository cursoAulaRepository;

    @Autowired
    private CursoRepository cursoRepository;


    @Autowired
    private UserService userService;

    public CursoAula salvarCursoAula(CursoAulaDTO cursoAulaDTO) {
        // Buscar o curso pelo ID
        Curso curso = cursoRepository.findById(cursoAulaDTO.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        // Garantir que a data esteja no formato "yyyy-MM-dd"
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dataAula = null;
        try {
            // Se a data for uma String (no formato "yyyy-MM-dd"), parse para Date
           if (cursoAulaDTO.getData() instanceof Date) {
                dataAula = (Date) cursoAulaDTO.getData(); // Cast correto de Date para Date
            }
        } catch (Exception e) {
            throw new RuntimeException("Formato de data inválido. Utilize o formato yyyy-MM-dd.");
        }

        // Criar a entidade CursoAula
        CursoAula cursoAula = CursoAula.builder()
                .curso(curso)
                .titulo(cursoAulaDTO.getTitulo())
                .descricao(cursoAulaDTO.getDescricao())
                .data(dataAula) // Atribuindo a data corretamente
                .build();

        // Salvar a nova Aula
        return cursoAulaRepository.save(cursoAula);
    }
    // Lançar presença
    public CursoPresenca registrarPresenca(CursoPresenca presenca) {
        return presencaRepository.save(presenca);
    }

    // Listar todas as presenças do aluno em um curso aula
    public List<CursoPresenca> listarPresencasDoAluno(Long cursoAulaId, Long estudanteId) {
        return presencaRepository.findByCursoAulaIdAndEstudanteId(cursoAulaId, estudanteId);
    }

    // Editar presença do aluno
    public CursoPresenca editarPresenca(Long id, CursoPresenca novaPresenca) {
        Optional<CursoPresenca> presencaExistente = presencaRepository.findById(id);

        if (presencaExistente.isPresent()) {
            CursoPresenca presenca = presencaExistente.get();
            return presencaRepository.save(presenca);
        }
        throw new RuntimeException("Presença não encontrada.");
    }

    // Lançar presenças para uma lista de alunos em um curso aula
    public void lancarPresencas(Long cursoAulaId, List<Long> estudantesIds) {
        // Remove as presenças atuais para o curso aula
        presencaRepository.deleteByCursoAulaId(cursoAulaId);

        // Lança as novas presenças
        for (Long estudanteId : estudantesIds) {
            CursoPresenca presenca = CursoPresenca.builder()
                    .cursoAula(CursoAula.builder().id(cursoAulaId).build())
                    .estudante(EstudanteCurso.builder().id(estudanteId).build())
                    .build();
            presencaRepository.save(presenca);
        }
    }

    public List<EstudanteCurso> listarAlunosPresentesNoCursoAula(Long cursoAulaId) {
        return presencaRepository.findEstudantesPresentesByCursoAulaId(cursoAulaId);
    }

    public List<CursoAula> listarAulasDoCurso(Long cursoId) {
        return cursoAulaRepository.findByCursoId(cursoId);
    }

    public List<Date> listarDatasPresencaDoAlunoNoCurso(Long cursoId) {

        return presencaRepository.findDatas(userService.getUserDoToken().getId(), cursoId);
    }



}