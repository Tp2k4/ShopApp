package com.gms.gmshopbackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
@Document(indexName = "products")
public class Product extends BaseEntity{

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
    private List<ProductImage> productImages;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private com.gms.gmshopbackend.model.Category category;

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private com.gms.gmshopbackend.model.Brand brand;


    @OneToOne
    @JoinColumn(name = "mouse_specs_id")
    private MouseSpecs mouseSpecs;

    @OneToOne
    @JoinColumn(name = "keyboard_specs_id")
    private KeyboardSpecs keyboardSpecs;

    @OneToOne
    @JoinColumn(name = "headphone_specs_id")
    private HeadphoneSpecs headphoneSpecs;

}


