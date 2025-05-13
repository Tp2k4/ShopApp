package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.dtos.ProductOrderResponseDTO;
import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.response.OrderResponse;

import java.util.List;

public interface IOrderService {
    public OrderResponse createOrder(OrderDTO orderDTO, User user);
    public OrderResponse updateOrder(Long id, OrderDTO orderDTO);
    public List<OrderResponse> getAllOrders();
    public OrderResponse getOrderById(Long id);
    public void deleteOrder(Long id);
    public List<OrderResponse> getOrdersByUserId(Long userId);

}
