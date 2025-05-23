package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.dtos.ProductOrderResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate orderDate;
    private String status;
    private double totalPrice;
    private String address;
    List<ProductOrderResponseDTO> products;

}
