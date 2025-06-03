package com.gms.gmshopbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GMshopBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GMshopBackendApplication.class, args);
    }

}
