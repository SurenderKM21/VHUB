package com.vhub.v1.dto.request;

import com.vhub.v1.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserCreateRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private Role role;
}
