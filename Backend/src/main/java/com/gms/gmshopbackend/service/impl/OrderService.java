package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.model.*;
import com.gms.gmshopbackend.repository.*;
import com.gms.gmshopbackend.service.inter.IOrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final InventoryService inventoryService;


    @Override
    @Transactional
    public Order createOrder(OrderDTO orderDTO, User user) {
//        User user = userRepository.findById(orderDTO
//                .getUserId())
//                .orElseThrow(
//                        () -> new RuntimeException("User not found")
//                );

        modelMapper.typeMap(OrderDTO.class, Order.class).addMappings(mapper -> mapper.skip(Order::setId));
        Order order = new Order();

        modelMapper.map(orderDTO, order);
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setActive(true);
        order.setStatus("Pending");
        LocalDate shippingDate = LocalDate.now().plusDays(5);
        order.setShippingDate(shippingDate);
        orderRepository.save(order);
        Cart cart = cartRepository.findByUserId(user);
        List<OrderDetail> orderDetails = new ArrayList<>();
        List<CartItem> cartItems = cartItemRepository.findByCartIdAndIsSelectedTrue(cart);
        for (CartItem cartItem : cartItems) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            Long productId = cartItem.getProduct().getId();
            Product product = productRepository.findById(productId).orElseThrow(
                    () -> new RuntimeException("Product not found")
            );
            orderDetail.setProduct(product);
            int quantity = cartItem.getQuantity();
            if(product.getStockQuantity() < quantity) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }
            orderDetail.setNumberOfProducts(quantity);
            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);
            orderDetail.setPrice(product.getPrice());
            orderDetail.setTotalMoney(product.getPrice() * quantity);

            orderDetails.add(orderDetail);
            inventoryService.exportInventory(product, quantity);
        }


        if (cart != null) {
            cartItemRepository.deleteAllByCartIdAndIsSelectedTrue(cart);
        }


        orderDetailRepository.saveAll(orderDetails);


        return order;
    }

    @Override
    public Order updateOrder(Long id, OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId()).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Order not found")
        );

        modelMapper.typeMap(OrderDTO.class, Order.class).addMappings(mapper -> mapper.skip(Order::setId));
        modelMapper.map(orderDTO, order);


        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) throws RuntimeException {
        Order existingOrder = orderRepository
                .findById(id)
                .orElseThrow(() ->new RuntimeException("Data not found exception"));

        return existingOrder;
    }

    @Override
    public void deleteOrder(Long id) {
        try{
            Optional<Order> existingOrder = orderRepository.findById(id);
            if(existingOrder.isPresent()){
                existingOrder.get().setActive(false);
                orderRepository.save(existingOrder.get());
            }

        }catch (RuntimeException e){
            throw new RuntimeException("Order not found");
        }

    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
       return orderRepository.findByUserId(userId);
    }
}
