package com.biz_lens.BizLens_Backend.Service;

import com.biz_lens.BizLens_Backend.Dto.RegistrationRequest;
import com.biz_lens.BizLens_Backend.Entity.User;
import com.biz_lens.BizLens_Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public User authenticateUser(String email, String password) {
        logger.info("Authenticating user with email: {}", email);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            logger.info("User found with email: {}", email);
            if (user.getPassword().equals(password)) {
                logger.info("Authentication successful for user: {}", email);
                return user; // Authentication successful
            } else {
                logger.warn("Invalid password for email: {}", email);
                throw new IllegalArgumentException("Invalid password.");
            }
        } else {
            logger.warn("User not found with email: {}", email);
            throw new IllegalArgumentException("User not found.");
        }
    }

    public User registerUser(RegistrationRequest registrationRequest) {
        logger.info("Registering user with email: {}", registrationRequest.getEmail());

        Optional<User> existingUser = userRepository.findByEmail(registrationRequest.getEmail());
        if (existingUser.isPresent()) {
            logger.warn("Email already exists: {}", registrationRequest.getEmail());
            throw new IllegalArgumentException("Email already exists.");
        }

        User newUser = new User();
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setPassword(registrationRequest.getPassword());

        logger.info("User registered: {}", registrationRequest.getEmail());
        return userRepository.save(newUser);
    }
}
