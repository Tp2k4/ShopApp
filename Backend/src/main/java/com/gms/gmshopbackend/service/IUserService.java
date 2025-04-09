package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.dtos.UserDTO;
import com.gms.gmshopbackend.dtos.UserLoginDTO;
import com.gms.gmshopbackend.model.User;

public interface IUserService {
    public User createUser(UserDTO userDTO);
    public String login(String username, String password);
}
