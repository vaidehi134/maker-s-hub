package com.example.MakersHub.dto;

import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.entity.Post;
import com.example.MakersHub.enums.PaymentMethod;
import com.example.MakersHub.enums.PostStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentDTO {

    private Long postId;
    private Long clientId;
    private Long crafterId;
    private Double amount;
    private PostStatus postStatus;
    private PaymentMethod paymentMethod;
    private String paymentNote;

}


