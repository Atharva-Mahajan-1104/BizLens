package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Dto.LoginRequest;
import com.biz_lens.BizLens_Backend.Dto.RegistrationRequest;
import com.biz_lens.BizLens_Backend.Entity.User;
import com.biz_lens.BizLens_Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            response.put("success", true);
            response.put("message", "Authentication successful");
            response.put("user", user.getUsername());
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegistrationRequest registrationRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userService.registerUser(registrationRequest);
            response.put("success", true);
            response.put("message", "Registration successful");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
