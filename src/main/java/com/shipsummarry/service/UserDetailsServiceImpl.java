package com.shipsummarry.service;

import com.shipsummarry.data.entity.WebUser;
import com.shipsummarry.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implementation of Spring Security UserDetailsService
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Implementation of loadUserByUsername method from UserDetailsService
     *
     * @param username Username of a WebUser
     * @return SpringSecurity UserDetails created based on WebUser and UserRoles
     * @throws UsernameNotFoundException if WebUser with such username is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        WebUser webUser = userRepository.findOne(UserRepository.hasUsername(username))
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " is not found"));

        return User.builder()
                .username(webUser.getUsername())
                .password(webUser.getPassword())
                .roles(new String[] { webUser.getRole().toString() })
                .build();
    }

}
