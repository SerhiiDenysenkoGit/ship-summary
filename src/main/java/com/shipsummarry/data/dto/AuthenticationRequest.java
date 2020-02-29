package com.shipsummarry.data.dto;

import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class AuthenticationRequest {

    private String username;
    private String password;

    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String admin = "admin";
        System.out.println(encoder.encode(admin));
    }
}
