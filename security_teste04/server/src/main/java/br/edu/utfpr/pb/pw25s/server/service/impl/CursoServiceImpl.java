package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.ProfessorCurso;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
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
@Service
public class CursoServiceImpl extends CrudServiceImpl<Curso, Long>{
    @Autowired
    private CursoRepository repository;

    private final PessoaRepository pessoaRepository;

    private final UserService userService;

    public CursoServiceImpl(PessoaRepository pessoaRepository, UserService userService) {
        this.pessoaRepository = pessoaRepository;
        this.userService = userService;
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
