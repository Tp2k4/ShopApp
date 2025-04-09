package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;

public interface ICartItemService {
    public CartItem addCartItem(Cart cart, ProductCartDTO pCD);
    public CartItem updateCartItem(CartItem cartItem);
}
