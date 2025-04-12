package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.repository.CartItemRepository;
import com.gms.gmshopbackend.repository.CartRepository;
import com.gms.gmshopbackend.repository.ProductRepository;
import com.gms.gmshopbackend.service.inter.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    @Override
    public CartItem addCartItem(Cart cart, ProductCartDTO productCartDTO) {
        CartItem cartItem = CartItem.builder()
                .cartId(cart)
                .price(productCartDTO.getPrice())
                .quantity(productCartDTO.getQuantity())
                .addedAt(LocalDateTime.now())
                .product(productRepository.findById(productCartDTO
                        .getProductId())
                        .orElseThrow(
                                () -> new RuntimeException("Product not found")))
                .totalPrice(productCartDTO.getPrice()*productCartDTO.getQuantity())
                .build();

        return cartItemRepository.save(cartItem);

    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        return null;
    }
}
