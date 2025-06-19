package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.CartItemDTO;
import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.dtos.ProductOrderResponseDTO;
import com.gms.gmshopbackend.model.*;
import com.gms.gmshopbackend.repository.*;
import com.gms.gmshopbackend.response.OrderHistoryResponse;
import com.gms.gmshopbackend.response.OrderResponse;
import com.gms.gmshopbackend.service.inter.IOrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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
    @CacheEvict(value = {"allOrders", "order", "ordersByUser", "orderHistory", "todayOrders"}, allEntries = true)

    public OrderResponse createOrder(OrderDTO orderDTO, User user) {
        // Ánh xạ từ DTO sang entity, bỏ qua ID
        modelMapper.typeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));
        Order order = new Order();
        modelMapper.map(orderDTO, order);
        order.setEmail(user.getEmail());

        // Thiết lập thông tin đơn hàng
        order.setUser(user);
        order.setOrderDate(LocalDate.now());
        order.setActive(true);
        order.setStatus(OrderStatus.PENDING.name());
        order.setShippingDate(LocalDate.now().plusDays(5));

        // Kiểm tra giỏ hàng
        Cart cart = cartRepository.findByUserId(user);
        if (cart == null) {
            throw new IllegalStateException("Cart not found for user: " + user.getId());
        }

        // Lấy các mục đã chọn
        List<CartItemDTO> cartItems = orderDTO.getCartItems();
        if (cartItems == null || cartItems.isEmpty()) {
            throw new IllegalStateException("No items selected in the cart");
        }

        List<OrderDetail> orderDetails = new ArrayList<>();
        List<ProductOrderResponseDTO> products = new ArrayList<>();
        List<CartItem> orderItems = new ArrayList<>();
        double total = 0;

        for (CartItemDTO cartItem : cartItems) {
            // Lấy CartItem theo id, nếu không tìm thấy sẽ ném exception
            CartItem cItem = cartItemRepository.findById(cartItem.getCartItemId())
                    .orElseThrow(() -> new IllegalStateException("CartItem not found with id: " + cartItem.getCartItemId()));

            Product product = productRepository.findById(cItem.getProduct().getId())
                    .orElseThrow(() -> new IllegalStateException("Product not found with id: " + cItem.getProduct().getId()));

            int quantity = cartItem.getQuantity();
            if (product.getStockQuantity() < quantity) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            // Cập nhật tồn kho
            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);
            inventoryService.exportInventory(product, quantity);

            // Tạo chi tiết đơn hàng
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProduct(product);
            orderDetail.setNumberOfProducts(quantity);
            orderDetail.setPrice((product.getDiscountPercent() == null) ? (1 * product.getPrice()) : ((1 - product.getDiscountPercent().floatValue()*0.01f) * product.getPrice()));
            orderDetail.setTotalMoney(orderDetail.getPrice() * quantity);
            orderDetails.add(orderDetail);

            total += orderDetail.getTotalMoney();

            // Thêm vào danh sách phản hồi
            products.add(ProductOrderResponseDTO.builder()
                    .productName(product.getName())
                    .quantity(quantity)
                    .color("Random")
                    .build());
            orderItems.add(cItem);
        }

        // Thiết lập tổng tiền và lưu đơn hàng
        order.setTotalMoney((float) total);
        orderRepository.save(order);

        // Lưu chi tiết đơn hàng
        orderDetailRepository.saveAll(orderDetails);

        // Xóa các item đã chọn trong giỏ
        cartItemRepository.deleteAll(orderItems);

        // Trả về thông tin đơn hàng
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
    @CacheEvict(value = {"order", "ordersByUser", "allOrders", "orderHistory", "todayOrders"}, allEntries = true)
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
    @Cacheable("allOrders")
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
    @Cacheable(value = "order", key = "#id")
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
    @CacheEvict(value = {"order", "ordersByUser", "allOrders", "orderHistory", "todayOrders"}, allEntries = true)
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
    @Cacheable(value = "ordersByUser", key = "#userId")
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

    @Override
    @Cacheable(value = "orderHistory", key = "#user.id")
    public List<OrderHistoryResponse> orderHistory(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getId());
        List<OrderDetail> orderDetails = new ArrayList<>();
        for(Order order : orders){
            orderDetails.addAll(orderDetailRepository.findByOrder(order));
        }
        return orderDetails.stream().map(OrderHistoryResponse::fromOrderDetail).collect(Collectors.toList());
    }

    @Override
    @Cacheable("todayOrders")
    public int getTodayOrders() {
        LocalDate today = LocalDate.now();
        int count = 0;
        List<Order> orders = orderRepository.findByOrderDateBetween(today, today);
        for(Order order : orders){
            if(!order.getStatus().equalsIgnoreCase(OrderStatus.DELETED.toString())){
                count++;
            }
        }
        return count;
    }
    @CacheEvict(value = {"order", "ordersByUser", "allOrders", "orderHistory", "todayOrders"}, allEntries = true)
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
