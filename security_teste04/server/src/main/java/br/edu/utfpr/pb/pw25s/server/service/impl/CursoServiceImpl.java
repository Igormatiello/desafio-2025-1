package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Curso;
import br.edu.utfpr.pb.pw25s.server.repository.CursoRepository;
import br.edu.utfpr.pb.pw25s.server.service.ICursoService;
import org.springframework.stereotype.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


import java.util.List;
import java.util.Optional;
@Service
public class CursoServiceImpl implements ICursoService {
    @Autowired
    private CursoRepository repository;

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
    public Iterable<Curso> save(Iterable<Curso> iterable) {
        return repository.saveAll(iterable);
    }

    @Override
    public void flush() {
        repository.flush();
    }

    @Override
    public Curso findOne(Long id) {
        Optional<Curso> curso = repository.findById(id);
        return curso.orElse(null);
    }

    @Override
    public boolean exists(Long id) {
        return repository.existsById(id);
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void delete(Iterable<? extends Curso> iterable) {
        repository.deleteAll(iterable);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }
}
