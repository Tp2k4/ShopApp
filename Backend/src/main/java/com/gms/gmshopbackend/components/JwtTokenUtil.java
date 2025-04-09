package com.gms.gmshopbackend.components;

import com.gms.gmshopbackend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidParameterException;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    @Value("${jwt.expiration}")
    private int expiration;
    @Value("${jwt.secretkey}")
    private String secretkey;

    public String generateToken(User user) {
       Map<String, Object> claims = new HashMap<>();
       claims.put("phoneNumber", user.getPhoneNumber());
        this.generateSecretKey();
       try{
           String token = Jwts.builder()
                   .setClaims(claims)
                   .setSubject(user.getPhoneNumber())
                   .setExpiration(new Date(System.currentTimeMillis() + expiration*1000L))
                   .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                   .compact();
           return token;

       }catch (Exception e){
            throw new InvalidParameterException("Invalid token");
       }
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String generateSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] keyBytes = new byte[32];
        secureRandom.nextBytes(keyBytes);
        String secretKey = Encoders.BASE64.encode(keyBytes);

        System.out.println(secretKey);

        return secretKey;
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    public <T> T extractClaim(Function<Claims, T> claimsResolver, String token) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractPhoneNumber(String token) {
        return extractClaim(Claims::getSubject, token);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = extractClaim(Claims::getExpiration, token);
        return expirationDate.before(new Date());
    }

    public boolean validateToken(String token, UserDetails user) {
        String phoneNumber = (String) extractClaim(Claims::getSubject, token);

        return (phoneNumber.equals(user.getUsername()) && !isTokenExpired(token));
    }
}
