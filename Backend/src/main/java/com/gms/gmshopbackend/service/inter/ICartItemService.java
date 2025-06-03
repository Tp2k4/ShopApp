package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.model.User;

public interface ICartItemService {
    public CartItem addCartItem(Cart cart, ProductCartDTO pCD);
    public CartItem updateCartItem(CartItem cartItem);
    public CartItem updateQuantity(Long cartItemId, int quantity, User user);

    void deleteCartItem(Long cartItemId, User user);

    interface ICartService {
        public Cart getCartByUser(String user);
        public CartItem addCart(Long cartId, Long productId, Long quantity);
    }
}
