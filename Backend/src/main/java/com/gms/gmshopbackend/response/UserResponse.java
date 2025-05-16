package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String userName;
    private String name;
    private String phoneNumber;
    private String state;
    private String role;
    private String address;
    private String email;
    private String avatar;

    public static UserResponse fromUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getUsername())
                .name(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .state(user.isActive() ? "Hoạt động" : "Khóa")
                .address(user.getAddress())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .avatar("")
                .build();
    }

}
