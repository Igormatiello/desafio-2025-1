package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.CursoAvaliacao;
import br.edu.utfpr.pb.pw25s.server.model.CursoNota;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.repository.CursoAvaliacaoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.CursoNotaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.PessoaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AvaliacaoServiceImpl extends  CrudServiceImpl<CursoAvaliacao, Long>{

    private final CursoAvaliacaoRepository cursoAvaliacaoRepository;
    private final CursoNotaRepository cursoNotaRepository;
    private final CursoRepository cursoRepository;
    private final PessoaRepository pessoaRepository;

    public AvaliacaoServiceImpl(CursoAvaliacaoRepository cursoAvaliacaoRepository, CursoNotaRepository cursoNotaRepository, CursoRepository cursoRepository, PessoaRepository pessoaRepository) {
        this.cursoAvaliacaoRepository = cursoAvaliacaoRepository;
        this.cursoNotaRepository = cursoNotaRepository;
        this.cursoRepository = cursoRepository;
        this.pessoaRepository = pessoaRepository;
    }

    public CursoAvaliacao criarAvaliacao(Long cursoId, String descricao, String data) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dataFormatada;

        try {
            dataFormatada = dateFormat.parse(data);
        } catch (ParseException e) {
            throw new RuntimeException("Formato de data inválido. Use yyyy-MM-dd");
        }

        CursoAvaliacao avaliacao = CursoAvaliacao.builder()
                .curso(curso)
                .descricao(descricao)
                .data(dataFormatada)
                .build();

        return cursoAvaliacaoRepository.save(avaliacao);
    }

    public CursoNota lancarNota(Long avaliacaoId, Long alunoId, Double nota) {
        CursoAvaliacao avaliacao = cursoAvaliacaoRepository.findById(avaliacaoId).orElseThrow(() -> new RuntimeException("Avaliação não encontrada"));
        Pessoa aluno = pessoaRepository.findById(alunoId).orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        CursoNota cursoNota = CursoNota.builder()
                .curso(avaliacao)
                .estudante(aluno)
                .nota(nota)
                .build();
        return cursoNotaRepository.save(cursoNota);
    }

    public void deletarNota(Long notaId) {
        cursoNotaRepository.deleteById(notaId);
    }


    public List<CursoAvaliacao> listarAvaliacoesPorCurso(Long cursoId) {
        return cursoAvaliacaoRepository.findByCursoId(cursoId);
    }

    public List<CursoNota> listarNotasPorAluno(Long alunoId) {
        return cursoNotaRepository.findByEstudanteId(alunoId);
    }

    @Override
    protected JpaRepository<CursoAvaliacao, Long> getRepository() {
        return null;
    }
}
