package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionDTO {
    private String name;
    private String type;
    private String status;

    @JsonProperty(value = "start_date")
    private Date startDate;

    @JsonProperty(value = "end_date")
    private Date endDate;

    private List<ProductPromotionDTO> listProduct;
}
