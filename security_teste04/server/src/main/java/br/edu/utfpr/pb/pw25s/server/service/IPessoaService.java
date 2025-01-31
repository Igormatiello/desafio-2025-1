package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.EnderecoDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.PessoaEndereco;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;

public interface IPessoaService extends ICrudService<Pessoa, Long> {
    Boolean salvarEndereco(EnderecoDTO enderecoDTO);

}
