package br.edu.utfpr.pb.pw25s.server.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class CrudServiceImpl<T, ID extends Serializable> {

    protected abstract JpaRepository<T, ID> getRepository();

    public List<T> findAll() {
        return getRepository().findAll();
    }

    public List<T> findAll(Sort sort) {
        return getRepository().findAll(sort);
    }

    public Page<T> findAll(Pageable pageable) {
        return getRepository().findAll(pageable);
    }

    @Transactional
    public T save(T entity) {
        return getRepository().save(entity);
    }

    @Transactional
    public T saveAndFlush(T entity) {
        return getRepository().saveAndFlush(entity);
    }

    @Transactional
    public List<T> saveAll(Iterable<T> entities) {
        return getRepository().saveAll(entities);
    }

    public Optional<T> findById(ID id) {
        return getRepository().findById(id);
    }

    public boolean existsById(ID id) {
        return getRepository().existsById(id);
    }

    @Transactional(readOnly = true)
    public long count() {
        return getRepository().count();
    }

    @Transactional
    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }

    @Transactional
    public void delete(T entity) {
        getRepository().delete(entity);
    }

    @Transactional
    public void deleteAll(Iterable<? extends T> entities) {
        getRepository().deleteAll(entities);
    }

    @Transactional
    public void deleteAll() {
        getRepository().deleteAll();
    }
}
