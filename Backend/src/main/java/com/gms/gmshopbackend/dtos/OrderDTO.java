package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gms.gmshopbackend.model.CartItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.checkerframework.checker.units.qual.N;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    @JsonProperty(value = "user_id")
    @NotBlank(message = "userId is required")
    private Long userId;

    @JsonProperty(value = "fullname")
    private String fullName;

    private String email;

    @NotBlank(message = "phone number is required")
    @JsonProperty(value = "phone_number")
    private String phoneNumber;

    @NotBlank(message = "address is required")
    private String address;

    private String note;

    @JsonProperty(value = "total_money")
    private float totalMoney;

    @JsonProperty(value = "payment_method")
    private String paymentMethod;

    @JsonProperty(value = "shipping_method")
    private String shippingMethod;

    @JsonProperty(value = "shipping_address")
    private String shippingAddress;
    

    @JsonProperty(value = "tracking_number")
    private String trackingNumber;


    private boolean active;

//    @JsonProperty(value = "cart_items")
//    private List<CartItemDTO> cartItems;





}
