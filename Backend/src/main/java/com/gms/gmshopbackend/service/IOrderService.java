package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.model.User;

import java.util.List;

public interface IOrderService {
    public Order createOrder(OrderDTO orderDTO, User user);
    public Order updateOrder(Long id, OrderDTO orderDTO);
    public List<Order> getAllOrders();
    public Order getOrderById(Long id);
    public void deleteOrder(Long id);
    public List<Order> getOrdersByUserId(Long userId);
}
