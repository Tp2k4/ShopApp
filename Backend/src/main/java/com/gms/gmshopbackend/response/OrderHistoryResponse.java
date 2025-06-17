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
    private String thumbnail;
    private Long productId;
    private Long categoryId;

    public static OrderHistoryResponse fromOrderDetail(OrderDetail orderDetail) {
        String color;
        if(orderDetail.getProduct().getHeadphoneSpecs() != null) {
            color = orderDetail.getProduct().getHeadphoneSpecs().getColor();
        }else if(orderDetail.getProduct().getKeyboardSpecs() != null) {
            color = orderDetail.getProduct().getKeyboardSpecs().getColor();
        }else{
            color = orderDetail.getProduct().getMouseSpecs().getColor();
        }
        OrderHistoryResponse orderHistoryResponse = OrderHistoryResponse.builder()
                .orderId(orderDetail.getOrder().getId())
                .orderStatus(orderDetail.getOrder().getStatus())
                .productName(orderDetail.getProduct().getName())
                .originPrice(orderDetail.getProduct().getPrice())
                .sellPrice(orderDetail.getPrice())
                .quantity(orderDetail.getNumberOfProducts())
                .type(color)
                .thumbnail(orderDetail.getProduct().getThumbnail())
                .productId(orderDetail.getProduct().getId())
                .categoryId(orderDetail.getProduct().getCategory().getId())
                .build();

        return orderHistoryResponse;
    }
}
