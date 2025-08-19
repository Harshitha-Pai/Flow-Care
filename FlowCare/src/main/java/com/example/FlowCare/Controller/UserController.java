package com.example.FlowCare.Controller;

import com.example.FlowCare.Entity.User;
import com.example.FlowCare.Services.UserServices;
import com.example.FlowCare.Config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow all origins for testing
public class UserController {

    @Autowired
    private UserServices userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.registerUser(user);
            response.put("message", "Registration successful");
        } catch (RuntimeException e) {
            response.put("message", e.getMessage());
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userService.getUserByEmail(email);

        if (userOpt.isPresent() && userService.loginUser(email, password)) {
            User user = userOpt.get();

            // Generate JWT
            String token = jwtUtil.generateToken(user.getEmail());

            response.put("message", "Login successful");
            response.put("token", token);  // return JWT token
            response.put("name", user.getName());
            response.put("email", user.getEmail());
        } else {
            response.put("message", "Invalid email or password");
        }
        return response;
    }
}
