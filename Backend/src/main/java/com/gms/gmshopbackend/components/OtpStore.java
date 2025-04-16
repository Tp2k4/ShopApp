package com.gms.gmshopbackend.components;


import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStore {

    private final Map<String, OtpInfo> otpMap = new ConcurrentHashMap<>();

    public void saveOtp(String email, String otp) {
        otpMap.put(email, new OtpInfo(otp, LocalDateTime.now().plusMinutes(5)));
    }

    public boolean verifyOtp(String email, String otp) {
        OtpInfo info = otpMap.get(email);
        if (info == null || info.getExpiredTime().isBefore(LocalDateTime.now())) {
            return false;
        }
        return info.getOtp().equals(otp);
    }

}
