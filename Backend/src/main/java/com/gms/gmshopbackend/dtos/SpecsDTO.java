package com.gms.gmshopbackend.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
public class SpecsDTO {

    private String battery;

    private String warranty;

    private String connectionType;

    private float weight;

    private String color;

    // mouse
    private boolean led;
    private int maxDpi;

    // headphone
    private boolean hasMic;
    private boolean noiseCancelling;

    // keyboard
    private Long numKeys;
    private String switchType;
}
