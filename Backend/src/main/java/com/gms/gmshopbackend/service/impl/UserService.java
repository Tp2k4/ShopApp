package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.components.JwtTokenUtil;
import com.gms.gmshopbackend.components.OtpInfo;
import com.gms.gmshopbackend.components.OtpStore;
import com.gms.gmshopbackend.dtos.UserDTO;
import com.gms.gmshopbackend.dtos.UserResponseDTO;
import com.gms.gmshopbackend.model.Role;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.repository.RoleRepository;
import com.gms.gmshopbackend.repository.UserRepository;
import com.gms.gmshopbackend.response.UserLoginResponse;
import com.gms.gmshopbackend.response.UserResponse;
import com.gms.gmshopbackend.service.inter.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final JwtTokenUtil jwtTokenUtil;

    private final AuthenticationManager authenticationManager;

    private final OtpStore otpStore;

    private final MailService mailService;

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
               .email(userDTO.getEmail())
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
    public UserLoginResponse login(String username, String password) {
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
        String token = jwtTokenUtil.generateToken(existingUser);
        UserLoginResponse userResponse = new UserLoginResponse();
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setUsername(user.get().getFullName());
        userResponseDTO.setRole(user.get().getRole().getName());
        userResponse.setToken(token);
        userResponse.setUser(userResponseDTO);
        return userResponse;

    }

    @Override
    public List<UserResponse> getAllUsers() {
       try{
           return userRepository.findAll().stream().map(UserResponse::fromUser).collect(Collectors.toList());
       }catch (Exception e){
           throw new RuntimeException("Error getting all users");
       }
    }

    @Override
    public User getUserById(Long id) {
        User existingUser = userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        return existingUser;
    }


    public void sendOtpIfUserExists(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("Tài khoản không tồn tại.");
        }
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.saveOtp(email, otp);
        mailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        return otpStore.verifyOtp(email, otp);
    }

    public void resetPassword(String email, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("Email không tồn tại.");
        }
        User u = user.get();
        u.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(u);
    }
}
