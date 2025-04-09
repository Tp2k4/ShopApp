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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtFilters, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(
                                    String.format("%s/user/register", apiPrefix),
                                    String.format("%s/user/login", apiPrefix)
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



                            .anyRequest().authenticated();

        });
        return http.build();
    }

}
