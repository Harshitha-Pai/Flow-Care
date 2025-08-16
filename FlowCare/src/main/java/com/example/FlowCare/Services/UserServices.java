package com.example.FlowCare.Services;

import com.example.FlowCare.Entity.User;
import com.example.FlowCare.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // inject password encoder

    public User registerUser(User user) {
        // Check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public boolean loginUser(String email, String rawPassword) {
        Optional<User> user = userRepository.findByEmail(email);

        // Check if user exists and password matches
        return user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword());
    }
}
