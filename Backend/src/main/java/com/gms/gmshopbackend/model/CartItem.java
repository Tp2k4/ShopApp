package com.gms.gmshopbackend.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cartId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "total_price")
    private float totalPrice;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @Column(name = "is_selected", nullable = false)
    private boolean isSelected;
}
