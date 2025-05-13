package com.gms.gmshopbackend.response;


import com.gms.gmshopbackend.dtos.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginResponse {
    private String token;
    private UserResponseDTO user;
}
