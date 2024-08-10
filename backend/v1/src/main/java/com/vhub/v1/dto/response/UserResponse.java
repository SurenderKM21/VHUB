package com.vhub.v1.dto.response;

import com.vhub.v1.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {
    private int id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Role role;
}
