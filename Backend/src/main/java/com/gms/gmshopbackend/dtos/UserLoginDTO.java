package com.gms.gmshopbackend.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginDTO {
    @JsonProperty(value = "email")
    @NotBlank(message = "email not be blank")
    private String email;

    @NotBlank(message = "password not be blank")
    private String password;
}
