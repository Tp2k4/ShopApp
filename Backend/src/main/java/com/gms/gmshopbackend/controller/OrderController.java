package com.gms.gmshopbackend.controller;

import com.gms.gmshopbackend.dtos.OrderDTO;
import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.model.User;
import com.gms.gmshopbackend.response.OrderHistoryResponse;
import com.gms.gmshopbackend.response.OrderResponse;
import com.gms.gmshopbackend.service.impl.OrderService;
import com.gms.gmshopbackend.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;


    @GetMapping("/getall")
    public ResponseEntity<?> getAllOrders() {
        try{

            List<OrderResponse> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO,
                                         BindingResult bindingResult,
                                         @AuthenticationPrincipal User user) {
        try{
            if(bindingResult.hasErrors()) {
                List<String> errorsMessages = bindingResult.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorsMessages);
            }

            OrderResponse order = orderService.createOrder(orderDTO, user);

            return ResponseEntity.ok(order);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserOrder(@AuthenticationPrincipal User user) {
        try{

            List<OrderResponse> orders = orderService.getOrdersByUserId(user.getId());
            return new ResponseEntity<>(orders, HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable long orderId){
        try{
            OrderResponse order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(order);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/employee/delete/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable long orderId){
        try{
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok("Delete order successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @Valid @RequestBody OrderDTO orderDTO, BindingResult bindingResult){
        try {
            if (bindingResult.hasErrors()) {
                List<String> errormessages = bindingResult.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errormessages);
            }
            OrderResponse order = orderService.updateOrder(id, orderDTO);
            return ResponseEntity.ok(order);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/employee/checked/{id}")
    public ResponseEntity<?> staffChecked(@Valid @PathVariable Long id){
        try{
            orderService.staffChecked(id);
            return ResponseEntity.ok("Checked order successfully");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("user/history")
    public ResponseEntity<?> getOrderHistory(@AuthenticationPrincipal User user){
        try{
            List<OrderHistoryResponse> history = orderService.orderHistory(user);
            return ResponseEntity.ok(history);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/today-orders")
    public ResponseEntity<?> getTodayOrders(){
        try{
            return ResponseEntity.ok(orderService.getTodayOrders());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}
