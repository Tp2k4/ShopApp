package com.gms.gmshopbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "number_of_products", nullable = false)
    private int numberOfProducts;

    @Column(nullable = false)
    private float price;

    @Column(name = "total_money", nullable = false)
    private float totalMoney;

    private String  color;


}
