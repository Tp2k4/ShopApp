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
        // Lấy sản phẩm từ DB
        Product product = productRepository.findById(productCartDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Kiểm tra số lượng phải > 0
        int requestedQuantity = productCartDTO.getQuantity();
        if (requestedQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        // Kiểm tra số lượng tồn kho
        if (product.getStockQuantity() < requestedQuantity) {
            throw new RuntimeException("Stock quantity is not enough");
        }

        // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
        CartItem existingCartItem = cartItemRepository.findByCartIdAndProduct(cart, product);
        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
            return cartItemRepository.save(existingCartItem);
        }

        // Tính giá đã giảm nếu có
        float discountPercent = product.getDiscountPercent() != null
                ? product.getDiscountPercent().floatValue()*0.01f
                : 0.0f;
        float discountedPrice = product.getPrice() * (1 - discountPercent);

        // Tạo mới CartItem
        CartItem cartItem = CartItem.builder()
                .cartId(cart)
                .product(product)
                .quantity(requestedQuantity)
                .price(product.getPrice())
                .totalPrice(discountedPrice * requestedQuantity)
                .isSelected(true)
                .addedAt(LocalDateTime.now())
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
