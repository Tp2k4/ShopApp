package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.components.JwtTokenUtil;
import com.gms.gmshopbackend.dtos.UserDTO;
import com.gms.gmshopbackend.model.Role;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.repository.RoleRepository;
import com.gms.gmshopbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public User createUser(UserDTO userDTO) {
       String phoneNumber = userDTO.getPhoneNumber();
       if(userRepository.existsByPhoneNumber(phoneNumber)){
           throw new RuntimeException("Phone number already exists");
       }

       User newUser = User.builder()
               .fullName(userDTO.getFullName())
               .phoneNumber(phoneNumber)
               .address(userDTO.getAddress())
               .password(userDTO.getPassword())
               .dateOfBirth(userDTO.getDateOfBirth())
               .facebookAccountId(Math.toIntExact(userDTO.getFacebookAccountId()))
               .googleAccountId(Math.toIntExact(userDTO.getGoogleAccountId()))
               .build();

        Role role = roleRepository.findById(userDTO.getRoleId()).orElse(null);
        newUser.setRole(role);

        if(userDTO.getGoogleAccountId() == 0 && userDTO.getFacebookAccountId() == 0){
            String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());
            newUser.setPassword(encryptedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String username, String password) {
        Optional<User> user = userRepository.findByPhoneNumber(username);

        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }

        User existingUser = user.get();
        if(!user.get().isActive()){
            throw new RuntimeException("Your account was blocked");
        }
        if(!passwordEncoder.matches(password, existingUser.getPassword())){
            throw new BadCredentialsException("Invalid username or password");
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        authenticationManager.authenticate(authToken);
        return jwtTokenUtil.generateToken(existingUser);

    }
}
