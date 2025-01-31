package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    Optional<Pessoa> findByUserId(Long userId);


}
