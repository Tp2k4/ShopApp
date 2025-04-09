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
@Table(name = "keyboard_specs")
public class KeyboardSpecs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String battery;

    private String warranty;

    @Column(name = "num_keys")
    private Long numKeys;

    @Column(name = "switch_type")
    private String switchType;

    @Column(name = "connection_type")
    private String connectionType;

    private boolean led;

    private float weight;

    private String color;
}
