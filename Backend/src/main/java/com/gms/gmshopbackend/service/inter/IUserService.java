package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.UserDTO;
import com.gms.gmshopbackend.dtos.UserResponseDTO;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.response.UserLoginResponse;
import com.gms.gmshopbackend.response.UserResponse;

import java.util.List;

public interface IUserService {
    public User createUser(UserDTO userDTO);
    public UserLoginResponse login(String username, String password);
    public List<UserResponse> getAllUsers();
    public User getUserById(Long id);

}
