package br.edu.utfpr.pb.pw25s.server.security;

import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    private final AuthService authService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,
                                  AuthService authService) {
        super(authenticationManager);
        this.authService = authService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(SecurityConstants.HEADER_STRING);
        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String fingerprint = request.getHeader("Fingerprint");
        if (fingerprint == null) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Fingerprint missing");
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(request, fingerprint);
        if (authentication == null) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid token or fingerprint");
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }


    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request, String fingerprint) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {
            String user = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))
                    .build()
                    .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getSubject();
            String tokenFingerprint = JWT.decode(token.replace(SecurityConstants.TOKEN_PREFIX, "")).getClaim("fingerprint").asString();

            if (user != null && fingerprint.equals(tokenFingerprint)) {
                User userObj = (User) authService.loadUserByUsername(user);
                return new UsernamePasswordAuthenticationToken(user, null, userObj.getAuthorities());
            }
        }
        return null;
    }
}