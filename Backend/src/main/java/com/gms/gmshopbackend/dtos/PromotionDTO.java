package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionDTO {
    @JsonProperty(value = "name")
    private String name;
    @JsonProperty(value = "type")
    private String type;
//    @JsonProperty(value = "status")
//    private String status;

    @JsonProperty(value = "start_date")
    private LocalDate startDate;

    @JsonProperty(value = "end_date")
    private LocalDate endDate;

    @JsonProperty(value = "list_product")
    private List<ProductPromotionDTO> listProduct;
}
