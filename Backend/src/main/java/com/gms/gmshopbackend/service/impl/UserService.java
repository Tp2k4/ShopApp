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
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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
    @CacheEvict(value = {"allUsers", "userById"}, allEntries = true)
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
               .isActive(true)
               .build();
        Long roleId = userDTO.getRoleId()==null?2:userDTO.getRoleId();

        Role role = roleRepository.findById(roleId).orElse(null);
        newUser.setRole(role);

        if(userDTO.getGoogleAccountId() == 0 && userDTO.getFacebookAccountId() == 0){
            String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());
            newUser.setPassword(encryptedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public UserLoginResponse login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

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

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(existingUser.getPhoneNumber(), password);
        authenticationManager.authenticate(authToken);
        String token = jwtTokenUtil.generateToken(existingUser);
        UserLoginResponse userResponse = new UserLoginResponse();
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(user.get().getFullName());
        userResponseDTO.setRole(user.get().getRole().getName());
        userResponse.setToken(token);
        userResponse.setUser(userResponseDTO);
        return userResponse;

    }

    @Override
    @Cacheable("allUsers")
    public List<UserResponse> getAllUsers() {
       try{
           return userRepository.findAll().stream().map(UserResponse::fromUser).collect(Collectors.toList());
       }catch (Exception e){
           throw new RuntimeException("Error getting all users");
       }
    }

    @Override
    @Cacheable(value = "userById", key = "#id")
    public User getUserById(Long id) {
        User existingUser = userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        return existingUser;
    }

    @Override
    @CacheEvict(value = {"allUsers", "userById"}, key = "#userId", allEntries = true)
    public User updateUser(Long userId, UserDTO userDTO) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        if(!existingUser.getPhoneNumber().equals(userDTO.getPhoneNumber())){
            if(userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())){
                throw new RuntimeException("Phone number already exists");
            }
        }


        if(!existingUser.getEmail().equals(userDTO.getEmail())){
            if(userRepository.existsByEmail(userDTO.getEmail())){
                throw new RuntimeException("Email already exists");
            }
        }

        Role role = roleRepository.findById(userDTO.getRoleId()).orElseThrow(
                () -> new RuntimeException("Role not found")
        );



        existingUser.setFullName(userDTO.getFullName());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        existingUser.setAddress(userDTO.getAddress());
        existingUser.setDateOfBirth(userDTO.getDateOfBirth());
        existingUser.setActive(true);
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setRole(role);


        return userRepository.save(existingUser);
    }

    @Override
    @CacheEvict(value = {"allUsers", "userById"}, key = "#userId", allEntries = true)
    public void delete(Long userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        try{
            existingUser.setActive(false);
            userRepository.save(existingUser);
        }catch (Exception e){
            throw new RuntimeException("Error deleting user");
        }
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
