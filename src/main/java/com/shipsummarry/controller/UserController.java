package com.shipsummarry.controller;

import com.shipsummarry.data.entity.WebUser;
import com.shipsummarry.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public WebUser getUserInfo() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return userService.getByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));
    }



}
