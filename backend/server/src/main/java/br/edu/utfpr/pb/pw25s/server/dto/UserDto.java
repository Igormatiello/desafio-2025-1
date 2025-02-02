package br.edu.utfpr.pb.pw25s.server.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

    private String username;

    private String displayName;
}
