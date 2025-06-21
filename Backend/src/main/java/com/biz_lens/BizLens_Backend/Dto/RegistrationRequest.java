package com.biz_lens.BizLens_Backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    private String username; // Rename to `username`
    private String email;    // Rename to `email`
    private String password;
}