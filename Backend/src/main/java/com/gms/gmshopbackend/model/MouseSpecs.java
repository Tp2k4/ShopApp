package com.gms.gmshopbackend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mouse_specs")
public class MouseSpecs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String battery;

    private String warranty;

    @Column(name = "max_dpi")
    private int maxDpi;

    @Column(name = "connection_type")
    private String connectionType;

    private boolean led;

    private float weight;

    private String color;

}
