package com.shipsummarry.controller;

import com.shipsummarry.data.dto.PasswordChangeRequest;
import com.shipsummarry.data.entity.WebUser;
import com.shipsummarry.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public String createUser(@RequestBody WebUser webUser) {
        return userService.createUser(webUser);
    }

    @PutMapping("/password")
    public void updatePassword(@RequestBody PasswordChangeRequest changeRequest) {
        userService.updatePassword(changeRequest);
    }


}
