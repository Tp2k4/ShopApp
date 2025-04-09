package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartId(Cart cartId);

    void deleteAllByCartId(Cart cartId);

    List<CartItem> findByCartIdAndIsSelectedTrue(Cart cart);

    void deleteAllByCartIdAndIsSelectedTrue(Cart cart);
}
