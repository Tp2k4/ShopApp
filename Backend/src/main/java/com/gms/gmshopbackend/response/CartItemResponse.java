package com.gms.gmshopbackend.response;


import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.model.Product;
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
    private String productImageUrl;
    private Double originalPrice;
    private Long sellPrice;

    public static CartItemResponse fromCartItem(CartItem cartItem) {
        Product product = cartItem.getProduct();
        CartItemResponse cartItemResponse = CartItemResponse.builder()
                .id(cartItem.getId())
                .price(cartItem.getPrice())
                .quantity(cartItem.getQuantity())
                .totalPrice(cartItem.getTotalPrice())
                .productName(cartItem.getProduct().getName())
                .productId(cartItem.getProduct().getId())
                .productImageUrl(product.getThumbnail())
                .originalPrice(cartItem.getProduct().getOriginPrice())
                .sellPrice((long)((double) (product.getDiscountPercent() == null
                        ? product.getPrice()
                        : product.getPrice() * (1 - product.getDiscountPercent().floatValue() * 0.01f))))

                .build();

        return cartItemResponse;
    }

}
