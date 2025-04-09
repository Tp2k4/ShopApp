package com.gms.gmshopbackend.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product productId;

    @Column(name = "product_name")
    private String productName;

    private int quantity;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "transaction_date")
    private Date transactionDate;
}
