package com.vhub.v1.services.impl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// import com.max.quizspring.dto.request.UserCreateRequest;
// import com.max.quizspring.dto.request.UserUpdateRequest;
import com.vhub.v1.dto.request.*;
import com.vhub.v1.dto.response.*;
import com.vhub.v1.model.*;
import com.vhub.v1.repository.*;
import com.vhub.v1.services.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UserServiceImpl implements UserService {
    private final CustomerRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Customer createUser(UserCreateRequest registerRequest) {
        Customer user = Customer.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .address(registerRequest.getAddress())
                .role(registerRequest.getRole())
                .build();
        return userRepository.save(user);
    }

    // @Override
    // public Customer updateUser(Long userId, CustomerUpdateRequest userUpdateRequest) {
    //     User user = userRepository.findById(userId).orElseThrow();
    //     user.setName(userUpdateRequest.getName());
    //     // user.setEmail(userUpdateRequest.getEmail());
    //     // user.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
    //     user.setPhone(userUpdateRequest.getPhone());
    //     user.setAddress(userUpdateRequest.getAddress());
    //     // user.setRole(userUpdateRequest.getRole());
    //     return userRepository.save(user);
    // }

    @Override
    public void deleteUser(int userId) {
        // userRepository.deleteById(userId);;
    }

    @Override
    public Customer getUserById(int userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public java.util.List<Customer> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        Customer user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return mapUserToUserResponse(user);
    }

    private UserResponse mapUserToUserResponse(Customer user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .build();
    }

}
