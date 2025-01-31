package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.dto.EnderecoDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.repository.PessoaRepository;
import br.edu.utfpr.pb.pw25s.server.service.IPessoaService;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
class PessoaServiceImpl implements IPessoaService {
    @Autowired
    private PessoaRepository repository;

    @Autowired
    private UserService userService;



    @Override
    public List<Pessoa> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Pessoa> findAll(Sort sort) {
        return repository.findAll(sort);
    }

    @Override
    public Page<Pessoa> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Pessoa save(Pessoa entity) {
        return repository.save(entity);
    }

    @Override
    public Pessoa saveAndFlush(Pessoa entity) {
        return repository.saveAndFlush(entity);
    }

    @Override
    public Iterable<Pessoa> save(Iterable<Pessoa> iterable) {
        return repository.saveAll(iterable);
    }

    @Override
    public void flush() {
        repository.flush();
    }

    @Override
    public Pessoa findOne(Long id) {
        Optional<Pessoa> pessoa = repository.findById(id);
        return pessoa.orElse(null);
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
    public void delete(Iterable<? extends Pessoa> iterable) {
        repository.deleteAll(iterable);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }

    @Override
    public Boolean salvarEndereco(EnderecoDTO enderecoDTO) {

    Optional<Pessoa> pessoa = repository.findByUserId(userService.getUserDoToken().getId());

    if(pessoa.isPresent()){
        PessoaEndereco pessoaEndereco = new PessoaEndereco();
        pessoaEndereco.setPessoa(pessoa.get());
        pessoaEndereco.setRua(enderecoDTO.getRua());
        pessoaEndereco.setCep(enderecoDTO.getCep());
        pessoaEndereco.setCidade(enderecoDTO.getCidade());
        pessoaEndereco.setNumero(enderecoDTO.getNumero());

        repository.save(pessoa);

    }

    else {
        return true;
    }

    return true;
    }
}
