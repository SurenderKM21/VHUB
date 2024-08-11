package com.vhub.v1.dto.response;

import javax.management.relation.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Role role;
}
