package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.*;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.EstudanteCursoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.PessoaRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProfessorCursoRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CursoServiceImpl extends CrudServiceImpl<Curso, Long>{
    @Autowired
    private CursoRepository repository;

    private final PessoaRepository pessoaRepository;

    private final EstudanteCursoRepository estudanteCursoRepository;


    private final UserService userService;

    public CursoServiceImpl(PessoaRepository pessoaRepository, EstudanteCursoRepository estudanteCursoRepository, UserService userService) {
        this.pessoaRepository = pessoaRepository;
        this.estudanteCursoRepository = estudanteCursoRepository;
        this.userService = userService;
    }

    public List<Curso> listarCursosAtivos() {
        return repository.findCursosAtivos();
    }


    public Curso criarCurso(Curso curso) {
        return repository.save(curso);
    }

    public Curso editarCurso(Long id, Curso curso) {
        if (repository.existsById(id)) {
            curso.setId(id);
            return repository.save(curso);
        }
        return null;
    }

    public List<Curso> listarCursos() {
        return repository.findAll();
    }

    public Curso desativarCurso(Long id) {
        Optional<Curso> cursoOpt = repository.findById(id);
        if (cursoOpt.isPresent()) {
            Curso curso = cursoOpt.get();
            curso.setStatus("INATIVO");
            return repository.save(curso);
        }
        return null;
    }

    @Autowired
    private ProfessorCursoRepository professorCursoRepository; // Repositório para associação

    public List<Curso> listarCursosSemProfessor() {
        return repository.findCursosSemProfessor();
    }

    public ProfessorCurso associarProfessorCurso( Long cursoId) {
        if (professorCursoRepository.existsByCursoId(cursoId)) {
            throw new RuntimeException("Este curso já possui um professor associado.");
        }

        ProfessorCurso professorCurso = new ProfessorCurso();

        User user = userService.getUserDoToken();
        professorCurso.setProfessor(pessoaRepository.findByUserId(user.getId()));


        Optional<Curso> curso = repository.findById(cursoId);
        professorCurso.setCurso(curso.get());

        return professorCursoRepository.save(professorCurso);
    }

    public List<Pessoa> listarAlunosDoCurso(Long cursoId) {
        // Verifica se o curso existe
        Optional<Curso> cursoOpt = repository.findById(cursoId);
        if (cursoOpt.isEmpty()) {
            throw new RuntimeException("Curso não encontrado.");
        }

        Curso curso = cursoOpt.get();

        // Busca os estudantes matriculados no curso
        List<EstudanteCurso> estudantesCurso = estudanteCursoRepository.findByCurso(curso);

        // Retorna a lista de estudantes
        return estudantesCurso.stream()
                .map(EstudanteCurso::getEstudante)
                .collect(Collectors.toList());
    }


    public EstudanteCurso entrarNoCurso(Long cursoId) {
        // Obtém o usuário autenticado
        User user = userService.getUserDoToken();
        Pessoa estudante = pessoaRepository.findByUserId(user.getId());

        if (estudante == null) {
            throw new RuntimeException("Estudante não encontrado para o usuário do token.");
        }

        // Verifica se o curso existe
        Optional<Curso> cursoOpt = repository.findById(cursoId);
        if (cursoOpt.isEmpty()) {
            throw new RuntimeException("Curso não encontrado.");
        }
        Curso curso = cursoOpt.get();

        // Verifica se o estudante já está matriculado
        if (estudanteCursoRepository.existsByEstudanteAndCurso(estudante, curso)) {
            throw new RuntimeException("O estudante já está matriculado neste curso.");
        }

        // Cria a matrícula do estudante no curso
        EstudanteCurso estudanteCurso = new EstudanteCurso();
        estudanteCurso.setEstudante(estudante);
        estudanteCurso.setCurso(curso);

        return estudanteCursoRepository.save(estudanteCurso);
    }

    public void desassociarProfessorCurso(Long cursoId) {
        User user = userService.getUserDoToken();
        Pessoa professor = pessoaRepository.findByUserId(user.getId());

        if (professor == null) {
            throw new RuntimeException("Professor não encontrado para o usuário do token.");
        }

        Optional<ProfessorCurso> professorCursoOpt = professorCursoRepository.findByProfessorAndCursoId(professor, cursoId);

        if (professorCursoOpt.isPresent()) {
            professorCursoRepository.delete(professorCursoOpt.get());
        } else {
            throw new RuntimeException("O professor não está associado a este curso.");
        }
    }

    public List<Curso> listarMeusCursos() {
        User user = userService.getUserDoToken();
        Pessoa professor = pessoaRepository.findByUserId(user.getId());

        return professorCursoRepository.findByProfessor(professor)
                .stream()
                .map(ProfessorCurso::getCurso)
                .collect(Collectors.toList());
    }

    @Override
    protected JpaRepository<Curso, Long> getRepository() {
        return repository;
    }

    @Override
    public List<Curso> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Curso> findAll(Sort sort) {
        return repository.findAll(sort);
    }

    @Override
    public Page<Curso> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Curso save(Curso entity) {
        return repository.save(entity);
    }

    @Override
    public Curso saveAndFlush(Curso entity) {
        return repository.saveAndFlush(entity);
    }


    @Override
    public long count() {
        return repository.count();
    }


    @Override
    public void deleteAll() {
        repository.deleteAll();
    }
}
