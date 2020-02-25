package com.shipsummarry.service;

import com.shipsummarry.data.entity.WebUser;
import com.shipsummarry.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<WebUser> getByUsername(String username) {
        return userRepository.findOne(UserRepository.equalPredicate("username", username));
    }
}
