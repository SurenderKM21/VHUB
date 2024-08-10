package com.vhub.v1.services;

import java.util.List;

import com.vhub.v1.model.*;
import com.vhub.v1.dto.request.UserCreateRequest;
import com.vhub.v1.dto.response.*;

public interface UserService {

    Customer createUser(UserCreateRequest registerRequest);


    public void deleteUser(int userId);

    public Customer getUserById(int userId);

    public List<Customer> getAllUsers();

    UserResponse getUserByEmail(String email);

}
