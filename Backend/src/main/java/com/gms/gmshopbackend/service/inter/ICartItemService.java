package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;

public interface ICartItemService {
    public CartItem addCartItem(Cart cart, ProductCartDTO pCD);
    public CartItem updateCartItem(CartItem cartItem);

    interface ICartService {
        public Cart getCartByUser(String user);
        public CartItem addCart(Long cartId, Long productId, Long quantity);
    }
}
