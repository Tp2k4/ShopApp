package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.User;
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
        Product product = productRepository.findById(productCartDTO
                        .getProductId())
                .orElseThrow(
                        () -> new RuntimeException("Product not found"));
        CartItem existingCart = cartItemRepository.findByCartIdAndProduct(cart, product);
        if(existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + 1);
            return cartItemRepository.save(existingCart);
        }
        CartItem cartItem = CartItem.builder()
                .cartId(cart)
                .price(productCartDTO.getPrice())
                .quantity(productCartDTO.getQuantity())
                .addedAt(LocalDateTime.now())
                .product(product)
                .totalPrice(productCartDTO.getPrice()*productCartDTO.getQuantity())
                .build();

        return cartItemRepository.save(cartItem);

    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        return null;
    }
    @Override
    public CartItem updateQuantity(Long cartItemId, int quantity, User user) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        // Kiểm tra quyền sở hữu
        if (!cartItem.getCartId().getUserId().getId().equals(user.getId())) {
            throw new RuntimeException("Permission denied");
        }

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }

        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(Long cartItemId, User user) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));
        // Kiểm tra quyền sở hữu
        if (!cartItem.getCartId().getUserId().getId().equals(user.getId())) {
            throw new RuntimeException("Permission denied");
        }

        cartItemRepository.delete(cartItem);
    }


    @Transactional
    public CartItem toggleSelected(Long cartItemId, User user) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        // Kiểm tra quyền sở hữu
        if (!cartItem.getCartId().getUserId().getId().equals(user.getId())) {
            throw new RuntimeException("Permission denied");
        }

        cartItem.setSelected(!cartItem.isSelected());
        return cartItemRepository.save(cartItem);
    }
}
