package com.gms.gmshopbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_images")
public class ProductImage {
    public static final int MAX_IMAGE_PER_PRODUCT = 5;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @ToString.Exclude
    private Product productId;

    @Column(name = "image_url")
    private String imageUrl;

}
