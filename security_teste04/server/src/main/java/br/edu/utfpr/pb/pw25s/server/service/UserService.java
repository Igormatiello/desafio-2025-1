package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.CreatePessoaDTO;
import br.edu.utfpr.pb.pw25s.server.model.Pessoa;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.impl.PessoaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // Usando @Lazy para evitar ciclo de dependência
    @Autowired
    @Lazy
    private PessoaServiceImpl pessoaService;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;

        bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
      //enviaEmail(user.getSecret());
        return userRepository.save(user);
    }

    public void createUser(CreatePessoaDTO createPessoaDTO) {
        User user = new User(createPessoaDTO.getUsername(), bCryptPasswordEncoder.encode(createPessoaDTO.getPassword()), createPessoaDTO.getNome());
        userRepository.save(user);

        Pessoa pessoa = new Pessoa(createPessoaDTO.getCpf(), createPessoaDTO.getAtivo(), user, createPessoaDTO.getNome(), createPessoaDTO.getEmail(), createPessoaDTO.getTelefone());
        pessoaService.save(pessoa);
    }

    public void editUserAndPessoa(CreatePessoaDTO createPessoaDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        user.setUsername(createPessoaDTO.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(createPessoaDTO.getPassword()));
        user.setDisplayName(createPessoaDTO.getNome());
        userRepository.save(user);

        Pessoa pessoa = pessoaService.findByUser(user).orElseThrow(() -> new RuntimeException("Pessoa not found"));
        pessoa.setCpf(createPessoaDTO.getCpf());
        pessoa.setAtivo(createPessoaDTO.getAtivo());
        pessoa.setNome(createPessoaDTO.getNome());
        pessoa.setEmail(createPessoaDTO.getEmail());
        pessoa.setTelefone(createPessoaDTO.getTelefone());
        pessoaService.save(pessoa);
    }

    public Object getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        Pessoa pessoa = pessoaService.findByUser(user).orElseThrow(() -> new RuntimeException("Pessoa not found"));
        return new Object[]{user, pessoa};
    }




    public User getUserDoToken() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username);

    }


}