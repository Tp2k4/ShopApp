package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.OrderDetail;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryResponse {
    private Long orderId;
    private String orderStatus;
    private String productName;
    private double originPrice;
    private double sellPrice;
    private String type;
    private int quantity;

    public static OrderHistoryResponse fromOrderDetail(OrderDetail orderDetail) {
        OrderHistoryResponse orderHistoryResponse = OrderHistoryResponse.builder()
                .orderId(orderDetail.getOrder().getId())
                .orderStatus(orderDetail.getOrder().getStatus())
                .productName(orderDetail.getProduct().getName())
                .originPrice(orderDetail.getProduct().getOriginPrice())
                .sellPrice(orderDetail.getPrice())
                .quantity(orderDetail.getNumberOfProducts())
                .build();

        return orderHistoryResponse;
    }
}
