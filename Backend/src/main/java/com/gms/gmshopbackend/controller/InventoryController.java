package com.gms.gmshopbackend.controller;


import com.gms.gmshopbackend.dtos.InventoryGroupByDateDTO;
import com.gms.gmshopbackend.response.InventoryResponse;
import com.gms.gmshopbackend.service.impl.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/inventory")
@AllArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("")
    public ResponseEntity<?> getInventory() {
        try {

            List<InventoryResponse> inventoryList = inventoryService.getInventory();
            return ResponseEntity.ok(inventoryList);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/import/{productId}/{quantity}")
    public ResponseEntity<?> importInventory(@PathVariable Long productId, @PathVariable int quantity) {
        try{
            InventoryResponse newImport = inventoryService.importInventory(productId, quantity);
            return ResponseEntity.ok(newImport);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/date-date")
    public ResponseEntity<?> getInventoryByDate(@RequestParam("from") LocalDate from, @RequestParam("to") LocalDate to) {
        try{
            List<InventoryResponse> inventoryList = inventoryService.getInventoryByDate(from, to);
            return ResponseEntity.ok(inventoryList);

        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
