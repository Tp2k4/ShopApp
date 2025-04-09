package com.gms.gmshopbackend.service;


import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.MouseSpecsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MouseSpecsService implements IMouseSpecsService {
    private final MouseSpecsRepository repository;

    @Override
    public MouseSpecs updateMouseSpecs(MouseSpecs mouseSpecs) {
        MouseSpecs existing = repository.findById(mouseSpecs.getId()).orElseThrow(
                () -> new RuntimeException("There is no mouse specs with id " + mouseSpecs.getId())
        );
        existing.setBattery(mouseSpecs.getBattery());
        existing.setLed(mouseSpecs.isLed());
        existing.setColor(mouseSpecs.getColor());
//        existing.setProduct(mouseSpecs.getProduct());
        existing.setMaxDpi(mouseSpecs.getMaxDpi());
        existing.setWarranty(mouseSpecs.getWarranty());
        existing.setWeight(mouseSpecs.getWeight());
        existing.setConnectionType(mouseSpecs.getConnectionType());

        MouseSpecs updated =  repository.save(existing);
        return updated;
    }

    @Override
    public MouseSpecs createMouseSpecs(Product product,MouseSpecs mouseSpecs) {
        MouseSpecs newMouseSpecs = MouseSpecs.builder()
                .led(mouseSpecs.isLed())
                .product(product)
                .battery(mouseSpecs.getBattery())
                .color(mouseSpecs.getColor())
                .maxDpi(mouseSpecs.getMaxDpi())
                .warranty(mouseSpecs.getWarranty())
                .weight(mouseSpecs.getWeight())
                .connectionType(mouseSpecs.getConnectionType())
                .build();

        return repository.save(newMouseSpecs);
    }
}
