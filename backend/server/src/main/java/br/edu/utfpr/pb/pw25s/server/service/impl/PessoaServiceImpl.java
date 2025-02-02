package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.dto.EnderecoDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.PessoaEnderecoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.PessoaRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaServiceImpl extends CrudServiceImpl<Pessoa, Long> {
    @Autowired
    private PessoaRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private PessoaEnderecoRepository enderecoRepository;



    @Override
    protected JpaRepository<Pessoa, Long> getRepository() {
        return repository;
    }

    public Optional<Pessoa> findByUser(User user) {
        return repository.findByUser(user);
    }


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
    public long count() {
        return repository.count();
    }


    @Override
    public void deleteAll() {
        repository.deleteAll();
    }


    public Boolean salvarEndereco(EnderecoDTO enderecoDTO) {

        Optional<Pessoa> pessoa = Optional.ofNullable(repository.findByUserId(userService.getUserDoToken().getId()));

        if (pessoa.isPresent()) {
            PessoaEndereco pessoaEndereco = new PessoaEndereco();
            pessoaEndereco.setPessoa(pessoa.get());
            pessoaEndereco.setRua(enderecoDTO.getRua());
            pessoaEndereco.setCep(enderecoDTO.getCep());
            pessoaEndereco.setCidade(enderecoDTO.getCidade());
            pessoaEndereco.setNumero(enderecoDTO.getNumero());

            // repository.save(pessoa);

        } else {
            return true;
        }

        return true;
    }

    public Boolean salvarOuEditarEndereco(EnderecoDTO enderecoDTO) {
        Optional<Pessoa> pessoa = Optional.ofNullable(
                repository.findByUserId(userService.getUserDoToken().getId())
        );

        if (pessoa.isPresent()) {
            PessoaEndereco pessoaEndereco;
            if (enderecoDTO.getId() != null) {
                // Se já existe um endereço, busca e atualiza
                pessoaEndereco = enderecoRepository.findById(enderecoDTO.getId()).orElse(new PessoaEndereco());
            } else {
                // Cria um novo endereço
                pessoaEndereco = new PessoaEndereco();
            }

            pessoaEndereco.setPessoa(pessoa.get());
            pessoaEndereco.setRua(enderecoDTO.getRua());
            pessoaEndereco.setCep(enderecoDTO.getCep());
            pessoaEndereco.setCidade(enderecoDTO.getCidade());
            pessoaEndereco.setNumero(enderecoDTO.getNumero());

            enderecoRepository.save(pessoaEndereco);
            return true;
        }
        return false;
    }


    public List<PessoaEndereco> listarEnderecos() {
        Optional<Pessoa> pessoa = Optional.ofNullable(
                repository.findByUserId(userService.getUserDoToken().getId())
        );

        return pessoa.map(p -> enderecoRepository.findByPessoaId(p.getId()))
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));
    }

}