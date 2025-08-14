package com.example.FlowCare.Controller;

import com.example.FlowCare.Entity.User;
import com.example.FlowCare.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")  // allow React Native app to access API
public class UserController {
    @Autowired
    private UserServices userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean success = userService.login(user.getEmail(), user.getPassword());
        return success ? "Login successful" : "Invalid email or password";
    }
}
