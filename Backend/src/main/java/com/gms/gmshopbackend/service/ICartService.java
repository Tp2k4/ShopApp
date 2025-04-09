package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;

public interface ICartService {
    public Cart getCartByUser(String user);
    public CartItem addCart(Long cartId, Long productId, Long quantity);
}
