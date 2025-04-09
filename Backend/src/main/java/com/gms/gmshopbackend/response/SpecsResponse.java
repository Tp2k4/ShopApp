package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.HeadphoneSpecs;
import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.MouseSpecs;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
public class SpecsResponse {
    private Long id;

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





    public static SpecsResponse toMouse(MouseSpecs mouseSpecs) {
        SpecsResponse response = SpecsResponse.builder()
                .id(mouseSpecs.getId())
                .battery(mouseSpecs.getBattery())
                .warranty(mouseSpecs.getWarranty())
                .maxDpi(mouseSpecs.getMaxDpi())
                .connectionType(mouseSpecs.getConnectionType())
                .led(mouseSpecs.isLed())
                .weight(mouseSpecs.getWeight())
                .color(mouseSpecs.getColor())
                .build();

        return response;
    }

    public static SpecsResponse toHeadphone(HeadphoneSpecs headphoneSpecs) {
        SpecsResponse response = SpecsResponse.builder()
                .id(headphoneSpecs.getId())
                .battery(headphoneSpecs.getBattery())
                .warranty(headphoneSpecs.getWarranty())
                .hasMic(headphoneSpecs.isHasMic())
                .connectionType(headphoneSpecs.getConnectionType())
                .noiseCancelling(headphoneSpecs.isNoiseCancelling())
                .weight(headphoneSpecs.getWeight())
                .color(headphoneSpecs.getColor())
                .build();

        return response;
    }

    public static SpecsResponse toKeyboard(KeyboardSpecs keyboardSpecs) {
        SpecsResponse response = SpecsResponse.builder()
                .id(keyboardSpecs.getId())
                .battery(keyboardSpecs.getBattery())
                .warranty(keyboardSpecs.getWarranty())
                .numKeys(keyboardSpecs.getNumKeys())
                .connectionType(keyboardSpecs.getConnectionType())
                .switchType(keyboardSpecs.getSwitchType())
                .weight(keyboardSpecs.getWeight())
                .color(keyboardSpecs.getColor())
                .led(keyboardSpecs.isLed())
                .build();

        return response;
    }


}
