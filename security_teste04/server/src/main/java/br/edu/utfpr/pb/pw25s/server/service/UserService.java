package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
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

    public UserService(UserRepository userRepository ) {

        this.userRepository = userRepository;

        bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
      //enviaEmail(user.getSecret());
        return userRepository.save(user);
    }

public boolean enviaEmail(String codigo){



    String remetente = "testeseg12@yahoo.com";
    String senha = "#S/X?hM)&yug4N@";
    String destinatario = "igormatiello1122@gmail.com";
    String assunto = "Assunto do e-mail";
    String conteudo = "Seu codigo é " + codigo;

    Properties props = new Properties();
    /*props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "587");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
*/
    props.put("mail.smtp.host", "smtp.mail.yahoo.com");
    props.put("mail.smtp.port", "587"); // Use a porta 465 ou 587
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true"); // Ative o TLS/SSL

    Session session = Session.getInstance(props, new Authenticator() {
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(remetente, senha);
        }
    });

    try {
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(remetente));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
        message.setSubject(assunto);
        message.setText(conteudo);

        Transport.send(message);
        System.out.println("E-mail enviado com sucesso!");
    } catch (MessagingException e) {
        e.printStackTrace();
        System.out.println("Erro ao enviar o e-mail.");
        return false;
    }
    return true;
}

//PC3HXRA2719Z95GVVEE5XFF9
    //codigo twilio


    public User getUserDoToken() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username);

    }


}