package com.gms.gmshopbackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private float price;

    private String thumbnail;

    @OneToMany(
            mappedBy = "productId",
            cascade = {CascadeType.ALL}
    )
    @ToString.Exclude
    private List<ProductImage> productImages;

    private String description;

    private String description_2;

    private String description_3;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private com.gms.gmshopbackend.model.Category category;

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;


    @OneToOne
    @JoinColumn(name = "mouse_specs_id")
    private MouseSpecs mouseSpecs;

    @OneToOne
    @JoinColumn(name = "keyboard_specs_id")
    private KeyboardSpecs keyboardSpecs;

    @OneToOne
    @JoinColumn(name = "headphone_specs_id")
    private HeadphoneSpecs headphoneSpecs;

    @Column(name = "discount_percent")
    private BigDecimal discountPercent;

    @Column(name = "origin_price")
    private Double originPrice;

    @Column(name = "is_active")
    private Boolean isActive;

}


