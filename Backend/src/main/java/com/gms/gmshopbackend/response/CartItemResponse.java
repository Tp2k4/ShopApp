package com.gms.gmshopbackend.response;


import com.gms.gmshopbackend.model.CartItem;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
public class CartItemResponse {
    private Long id;
    private String productName;
    private float price;
    private int quantity;
    private double totalPrice;
    private Long productId;

    public static CartItemResponse fromCartItem(CartItem cartItem) {
        CartItemResponse cartItemResponse = CartItemResponse.builder()
                .id(cartItem.getId())
                .price(cartItem.getPrice())
                .quantity(cartItem.getQuantity())
                .totalPrice(cartItem.getTotalPrice())
                .productName(cartItem.getProduct().getName())
                .productId(cartItem.getProduct().getId())
                .build();

        return cartItemResponse;
    }

}
