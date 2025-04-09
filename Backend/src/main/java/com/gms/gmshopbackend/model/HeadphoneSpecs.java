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
@Table(name = "headphone_specs")
public class HeadphoneSpecs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String battery;

    private String warranty;


    @Column(name = "connection_type")
    private String ConnectionType;

    @Column(name = "has_mic")
    private boolean hasMic;

    @Column(name = "noise_cancelling")
    private boolean noiseCancelling;


    private float weight;

    private String color;
}
