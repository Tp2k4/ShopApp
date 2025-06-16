package com.gms.gmshopbackend.controller;

import com.gms.gmshopbackend.dtos.ProductCartDTO;
import com.gms.gmshopbackend.model.Cart;
import com.gms.gmshopbackend.model.CartItem;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.repository.CartItemRepository;
import com.gms.gmshopbackend.repository.CartRepository;
import com.gms.gmshopbackend.response.CartItemResponse;
import com.gms.gmshopbackend.service.impl.CartItemService;
import com.gms.gmshopbackend.service.impl.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/cart/user")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartItemRepository cartItemRepository;
    private final CartItemService cartItemService;
    private final CartRepository cartRepository;

    @GetMapping("")
    public ResponseEntity<?> getCartByUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            Cart cart = cartService.getCartByUser(userDetails.getUsername());
            List<CartItem> cartList = cartItemRepository.findByCartId(cart);
            List<CartItemResponse> cartItemResponseList = cartList.stream()
                    .map(CartItemResponse::fromCartItem)
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(cartItemResponseList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PostMapping("")
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserDetails userDetails,
                                       @RequestBody ProductCartDTO productCartDTO) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
        }
        try {
            Cart cart = cartService.getCartByUser(userDetails.getUsername());
            CartItem cartItem = cartItemService.addCartItem(cart, productCartDTO);

            return ResponseEntity.ok().body(CartItemResponse.fromCartItem(cartItem));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @PutMapping("/update-quantity")
        public ResponseEntity<?> updateQuantity(@RequestBody Long cartItemId,
                                                @RequestBody int quantity,
                                                @AuthenticationPrincipal User user) {
            try {
                CartItem updated = cartItemService.updateQuantity(cartItemId, quantity, user);
                return ResponseEntity.ok(CartItemResponse.fromCartItem(updated));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    @PutMapping("/toggle-selected")
        public ResponseEntity<?> toggleSelected(@RequestBody Long cartItemId,
                                                @AuthenticationPrincipal User user) {
            try {
                CartItem updated = cartItemService.toggleSelected(cartItemId, user);
                return ResponseEntity.ok(CartItemResponse.fromCartItem(updated));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    @GetMapping("/selected-cartitem")
    public ResponseEntity<?> getSelectedCartItems(@AuthenticationPrincipal User user) {
        try {
            // Lấy giỏ hàng của user
            Cart cart = cartRepository.findByUserId(user);
            if (cart == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user");
            }

            // Lấy danh sách cart item được chọn
            List<CartItem> selectedItems = cartItemRepository.findByCartIdAndIsSelectedTrue(cart);

            // Map sang DTO để trả về frontend
            List<CartItemResponse> response = selectedItems.stream()
                    .map(CartItemResponse::fromCartItem)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi lấy cart item đã chọn: " + e.getMessage());
        }
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long cartItemId, @AuthenticationPrincipal User user) {
        try{
            cartItemService.deleteCartItem(cartItemId, user);
            return ResponseEntity.ok("Cart item deleted");
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



    }


