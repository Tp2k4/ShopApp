package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.dtos.ProductOrderResponseDTO;
import com.gms.gmshopbackend.model.*;
import com.gms.gmshopbackend.repository.*;
import com.gms.gmshopbackend.response.OrderResponse;
import com.gms.gmshopbackend.service.inter.IOrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public OrderResponse createOrder(OrderDTO orderDTO, User user) {

        modelMapper.typeMap(OrderDTO.class, Order.class).addMappings(mapper -> mapper.skip(Order::setId));
        Order order = new Order();

        modelMapper.map(orderDTO, order);
        order.setUser(user);
        order.setOrderDate(LocalDate.now());
        order.setActive(true);
        order.setStatus(String.valueOf(OrderStatus.PENDING));
        LocalDate shippingDate = LocalDate.now().plusDays(5);
        order.setShippingDate(shippingDate);
        orderRepository.save(order);
        Cart cart = cartRepository.findByUserId(user);
        List<OrderDetail> orderDetails = new ArrayList<>();
        List<CartItem> cartItems = cartItemRepository.findByCartIdAndIsSelectedTrue(cart);
        List<ProductOrderResponseDTO> products = new ArrayList<>();
        double total = 0;
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
            total += orderDetail.getTotalMoney();

            orderDetails.add(orderDetail);
            inventoryService.exportInventory(product, quantity);

            ProductOrderResponseDTO newProduct = ProductOrderResponseDTO.builder()
                    .productName(product.getName())
                    .quantity(quantity)
                    .color("Random")
                    .build();
            products.add(newProduct);
        }


        if (cart != null) {
            cartItemRepository.deleteAllByCartIdAndIsSelectedTrue(cart);
        }


        orderDetailRepository.saveAll(orderDetails);
        order.setTotalMoney((float) total);
        orderRepository.save(order);

        return new OrderResponse(
                order.getId(),
                order.getFullName(),
                order.getEmail(),
                order.getPhoneNumber(),
                order.getOrderDate(),
                order.getStatus(),
                order.getTotalMoney(),
                order.getAddress(),
                products
        );
    }

    @Override
    public OrderResponse updateOrder(Long id, OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId()).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Order not found")
        );

        modelMapper.typeMap(OrderDTO.class, Order.class).addMappings(mapper -> mapper.skip(Order::setId));
        modelMapper.map(orderDTO, order);

        List<ProductOrderResponseDTO> products = orderDetailRepository.findByOrder(order).stream()
                .map(detail -> new ProductOrderResponseDTO(
                        detail.getProduct().getName(),
                        detail.getNumberOfProducts(),
                        detail.getColor()
                )).collect(Collectors.toList());


        orderRepository.save(order);
        return new OrderResponse(
                order.getId(),
                order.getFullName(),
                order.getEmail(),
                order.getPhoneNumber(),
                order.getOrderDate(),
                order.getStatus(),
                order.getTotalMoney(),
                order.getAddress(),
                products
        );
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders =  orderRepository.findAll();
        return orders.stream().map(order -> {
            List<ProductOrderResponseDTO> products = orderDetailRepository.findByOrder(order).stream()
                    .map(detail -> new ProductOrderResponseDTO(
                            detail.getProduct().getName(),
                            detail.getNumberOfProducts(),
                            detail.getColor()
                    )).collect(Collectors.toList());

            return new OrderResponse(
                    order.getId(),
                    order.getFullName(),
                    order.getEmail(),
                    order.getPhoneNumber(),
                    order.getOrderDate(),
                    order.getStatus(),
                    order.getTotalMoney(),
                    order.getAddress(),
                    products
            );
        }).collect(Collectors.toList());
    }


    @Override
    public OrderResponse getOrderById(Long id) throws RuntimeException {
        Order existingOrder = orderRepository
                .findById(id)
                .orElseThrow(() ->new RuntimeException("Data not found exception"));

        List<ProductOrderResponseDTO> products = orderDetailRepository.findByOrder(existingOrder).stream()
                .map(detail -> new ProductOrderResponseDTO(
                        detail.getProduct().getName(),
                        detail.getNumberOfProducts(),
                        detail.getColor()
                )).collect(Collectors.toList());

        return new OrderResponse(
                existingOrder.getId(),
                existingOrder.getFullName(),
                existingOrder.getEmail(),
                existingOrder.getPhoneNumber(),
                existingOrder.getOrderDate(),
                existingOrder.getStatus(),
                existingOrder.getTotalMoney(),
                existingOrder.getAddress(),
                products
        );
    }

    @Override
    public void deleteOrder(Long id) {
        try{
            Optional<Order> existingOrder = orderRepository.findById(id);
            if(existingOrder.isPresent() && existingOrder.get().getStatus().equalsIgnoreCase(OrderStatus.PENDING.toString())) {
                existingOrder.get().setActive(false);
                existingOrder.get().setStatus(OrderStatus.DELETED.toString());
                orderRepository.save(existingOrder.get());
                List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(existingOrder.get());
                for(OrderDetail orderDetail : orderDetails){
                    Product product = productRepository.findById(orderDetail.getProduct().getId()).orElseThrow(
                            () -> new RuntimeException("Product not found")
                    );
                    inventoryService.importInventory(product.getId(), orderDetail.getNumberOfProducts());
                }
            }else{
                throw new InvalidParameterException("Order was delivered, so you can not delete this order");

            }
        }catch(InvalidParameterException e){
            throw e;
        }
        catch (Exception e){
            throw new RuntimeException("Order not found");
        }

    }

    @Override
    public List<OrderResponse> getOrdersByUserId(Long userId) {
       List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(order -> {
            List<ProductOrderResponseDTO> products = orderDetailRepository.findByOrder(order).stream()
                    .map(detail -> new ProductOrderResponseDTO(
                            detail.getProduct().getName(),
                            detail.getNumberOfProducts(),
                            detail.getColor()
                    )).collect(Collectors.toList());

            return new OrderResponse(
                    order.getId(),
                    order.getFullName(),
                    order.getEmail(),
                    order.getPhoneNumber(),
                    order.getOrderDate(),
                    order.getStatus(),
                    order.getTotalMoney(),
                    order.getAddress(),
                    products
            );
        }).collect(Collectors.toList());
    }

    public void staffChecked(Long orderId){
        Order existingOrder = orderRepository.findById(orderId).orElseThrow(
                () -> new RuntimeException("Order not found")
        );
        if(existingOrder.getStatus().equalsIgnoreCase("pending")){
            existingOrder.setStatus(String.valueOf(OrderStatus.DELIVERED));
            orderRepository.save(existingOrder);
        }else{
            throw new RuntimeException("Order is delivered, You couldn't change status of order");
        }
    }
}
