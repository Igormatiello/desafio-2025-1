package br.edu.utfpr.pb.pw25s.server.repository;


import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PessoaEnderecoRepository extends JpaRepository<PessoaEndereco, Long> {
    List<PessoaEndereco> findByPessoaId(Long pessoaId);


}
