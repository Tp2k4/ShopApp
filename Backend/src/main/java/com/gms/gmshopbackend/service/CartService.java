package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.repository.CartRepository;
import com.gms.gmshopbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    @Override
    public Cart getCartByUser(String user) {
        User exist_user = userRepository.findByPhoneNumber(user).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        Cart exist_cart = cartRepository.findByUserId(exist_user);
        if (exist_cart == null) {
            Cart new_cart = new Cart();
            new_cart.setUserId(exist_user);
            cartRepository.save(new_cart);
            return new_cart;
        }

        return exist_cart;
    }

    @Override
    public CartItem addCart(Long cartId, Long productId, Long quantity) {
        return null;
    }
}
