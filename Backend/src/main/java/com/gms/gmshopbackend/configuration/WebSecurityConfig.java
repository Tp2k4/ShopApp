package com.gms.gmshopbackend.configuration;

import com.gms.gmshopbackend.filters.JwtFilters;
import com.gms.gmshopbackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.GET;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Value("${api.prefix}")
    private String apiPrefix;

    private final JwtFilters jwtFilters;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // URL của frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true); // Nếu dùng cookies hoặc JWT token

        // Cấu hình CORS cho tất cả các endpoint
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Áp dụng cho tất cả các endpoint
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtFilters, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(
                                    String.format("%s/user/**", apiPrefix)
                            )
                            .permitAll()
                            .requestMatchers(PUT,
                                    String.format("%s/orders/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST,
                                    String.format("%s/orders/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(GET,
                                    String.format("%s/orders/user/**", apiPrefix)).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(DELETE,
                                    String.format("%s/orders/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET,
                                    String.format("%s/orders/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET,
                                    String.format("%s/product/**", apiPrefix)).hasAnyRole("ADMIN", "USER")
                            .requestMatchers(GET,
                                    String.format("%s/product/admin/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET,
                                    String.format("%s/product/category/**", apiPrefix)).hasAnyRole("ADMIN", "USER")
                            .requestMatchers(POST,
                                    String.format("%s/product/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT,
                                    String.format("%s/product/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE,
                                    String.format("%s/product/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET,
                                    String.format("%s/cart/user/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(GET,
                                    String.format("%s/inventory/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST,
                                    String.format("%s/inventory/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(POST,
                                    String.format("%s/brands/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(GET,
                                    String.format("%s/revenue/**", apiPrefix)).hasRole("ADMIN")



                            .anyRequest().authenticated();
                    try {
                        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
                    }catch(Exception e) {
                        e.printStackTrace();
                    }

        });
        return http.build();
    }
}
