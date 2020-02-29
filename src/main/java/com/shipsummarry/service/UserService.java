package com.shipsummarry.service;

import com.shipsummarry.data.dto.PasswordChangeRequest;
import com.shipsummarry.data.entity.WebUser;
import com.shipsummarry.data.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public Optional<WebUser> getByUsername(String username) {
        return userRepository.findOne(UserRepository.equalPredicate("username", username));
    }

    @Transactional
    public String createUser(WebUser webUser) {
        String encodedPassword = encoder.encode(webUser.getPassword());
        webUser.setPassword(encodedPassword);

        userRepository.saveAndFlush(webUser);
        return String.valueOf(webUser.getUserId());
    }

    @Transactional
    public void updatePassword(PasswordChangeRequest changeRequest) {
        WebUser user = getByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new IllegalStateException("Authentication user not found!"));
        if (!encoder.matches(changeRequest.getOldPassword(), user.getPassword())) {
            throw new IllegalStateException("Password is not correct!");
        } else {
            user.setPassword(encoder.encode(changeRequest.getNewPassword()));
            userRepository.saveAndFlush(user);
        }
    }
}
