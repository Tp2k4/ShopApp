package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductPromotionDTO;
import com.gms.gmshopbackend.dtos.PromotionDTO;
import com.gms.gmshopbackend.model.Promotion;
import com.gms.gmshopbackend.response.PromotionResponse;

import java.util.List;

public interface IPromotionService {
    public List<PromotionResponse> getAllPromotions();
    public Promotion createPromotion(PromotionDTO promotionDTO);
    public Promotion updatePromotion(Long id, PromotionDTO promotionDTO);
    public void deletePromotion(Long id);
    public Promotion setPromotion(Long id);

}
