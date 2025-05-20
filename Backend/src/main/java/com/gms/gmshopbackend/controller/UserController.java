package com.gms.gmshopbackend.controller;

import com.gms.gmshopbackend.dtos.UserDTO;
import com.gms.gmshopbackend.dtos.UserLoginDTO;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.repository.UserRepository;
import com.gms.gmshopbackend.response.UserLoginResponse;
import com.gms.gmshopbackend.response.UserResponse;
import com.gms.gmshopbackend.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            User user = userService.createUser(userDTO);
            return ResponseEntity.ok().body(UserResponse.fromUser(user));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            UserLoginResponse userResponse = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok().body(userResponse);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/alls")
    public ResponseEntity<?> getAllUsers() {
        try{
            List<UserResponse> users  = userService.getAllUsers();
            return ResponseEntity.ok().body(users);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok().body(UserResponse.fromUser(user));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> email) {
        try {
            String emailStr = email.get("email");
            userService.sendOtpIfUserExists(emailStr);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (userService.verifyOtp(email, otp)) {
            return ResponseEntity.ok("Xác thực OTP thành công.");
        }
        return ResponseEntity.badRequest().body("OTP sai hoặc hết hạn.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("new_password");
        try {
            userService.resetPassword(email, newPassword);
            return ResponseEntity.ok("Đặt lại mật khẩu thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUserId(@RequestBody UserDTO userDTO, @PathVariable Long userId) {
        try{
            User user = userService.updateUser(userId, userDTO);
            return ResponseEntity.ok().body(UserResponse.fromUser(user));

        }catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal User user) {
            return ResponseEntity.ok().body(UserResponse.fromUser(user));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> delete(@PathVariable Long userId) {
        try{
            userService.delete(userId);
            return ResponseEntity.ok("ok");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
