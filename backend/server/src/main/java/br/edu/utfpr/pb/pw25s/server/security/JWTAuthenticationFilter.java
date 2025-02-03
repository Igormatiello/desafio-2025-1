package br.edu.utfpr.pb.pw25s.server.security;

import br.edu.utfpr.pb.pw25s.server.model.LoginRequest;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;


    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;

    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginRequest loginRequest = new ObjectMapper().readValue(request.getInputStream(), LoginRequest.class);
            User user = (User) authService.loadUserByUsername(loginRequest.getUsername());

            // Validate TOTP
            GoogleAuthenticator gAuth = new GoogleAuthenticator();
            /*if (!user.getSecret().equals(loginRequest.getTotp())) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid TOTP");
                return null;
            }*/

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword(),
                            user.getAuthorities()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String fingerprint = request.getHeader("Fingerprint");

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expirationDateTime = now.plusSeconds(SecurityConstants.EXPIRATION_TIME);
        Date expirationDate = Date.from(expirationDateTime.atZone(ZoneId.systemDefault()).toInstant());

        String token = JWT.create()
                .withSubject(authResult.getName())
                .withClaim("fingerprint", fingerprint)
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET));



        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(new AuthenticationResponseDto(token)));
    }
}
