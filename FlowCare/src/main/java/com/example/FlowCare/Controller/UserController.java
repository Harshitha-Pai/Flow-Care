package com.example.FlowCare.Controller;

import com.example.FlowCare.Entity.User;
import com.example.FlowCare.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow all origins for testing
public class UserController {

    @Autowired
    private UserServices userService;

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
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();
        boolean success = userService.loginUser(email, password);

        if (success) {
            response.put("message", "Login successful");
        } else {
            response.put("message", "Invalid email or password");
        }
        return response;
    }
}
