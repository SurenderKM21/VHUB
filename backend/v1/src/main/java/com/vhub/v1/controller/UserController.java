package com.vhub.v1.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vhub.v1.dto.request.UserCreateRequest;
import com.vhub.v1.dto.response.UserResponse;
import com.vhub.v1.model.Customer;
import com.vhub.v1.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/user/add")
    public ResponseEntity<Customer> createUser(@RequestBody UserCreateRequest registerRequest) {
        Customer user = userService.createUser(registerRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    // @PutMapping("/users/update/{userId}")
    // public ResponseEntity<Customer> updateUser(@PathVariable Long userId,
    //     Customer updatedUser = userService.updateUser(userId, userUpdateRequest);
    //     return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    // }

    @DeleteMapping("/users/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<Customer> getUserById(@PathVariable int userId) {
        Customer user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/users/all")
    public List<Customer> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {
    UserResponse user = userService.getUserByEmail(email);
    return ResponseEntity.ok(user);
    }
}