package com.vhub.v1.services.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vhub.v1.config.JwtService;
import com.vhub.v1.dto.request.LoginRequest;
import com.vhub.v1.dto.request.RegisterRequest;
import com.vhub.v1.dto.response.LoginResponse;
import com.vhub.v1.enums.Role;
import com.vhub.v1.model.Token;
import com.vhub.v1.model.Customer;
import com.vhub.v1.repository.JwtRepo;
import com.vhub.v1.repository.CustomerRepo;
import com.vhub.v1.services.AuthService;
import com.vhub.v1.utils.JwtToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

@SuppressWarnings("null")
public class AuthServiceImpl implements AuthService {

    private final CustomerRepo userRepository;
    private final JwtRepo tokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtToken jwtUtil;


    public AuthenticationResponse register(RegisterRequest request) {
        Optional<Customer> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        var user = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone()).address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }

    // public LoginResponse login(LoginRequest loginRequest) {
        
    //         authenticationManager.authenticate(
    //                 new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        

    //     var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
    //     Map<String, Object> extraClaims = new HashMap<>();
    //     extraClaims.put("role", user.getRole().toString());
    //     var accessToken = jwtUtil.generateToken(extraClaims, user);
    //     revokeAllUserTokens(user);
    //     saveUserToken(user, accessToken);
    //     return LoginResponse.builder().accessToken(accessToken).build();
    // }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }

    private void saveUserToken(Customer user, String accessToken) {
        var token = Token.builder()
                .customer(user)
                .token(accessToken)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Customer user) {
        var validUserTokens = tokenRepository.findAllByCustomer_IdAndExpiredFalseAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public String createAdmin() {
        Optional<Customer> userExist = userRepository.findByEmail("admin@gmail.com");
        if (userExist.isPresent()) {
            return "Admin already exists with email id - admin@gmail.com";
        }

        var user = Customer.builder()
                .name("Admin")
                .email("admin@gmail.com")
                .password(passwordEncoder.encode("admin@123"))
                .phone("1234567890")
                .address("xyz")
                .role(Role.Admin)
                .build();
        userRepository.save(user);
        return "Admin registered successfully.";
    }
}
