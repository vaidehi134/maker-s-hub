package com.example.MakersHub.entity;


import com.example.MakersHub.enums.PaymentMethod;
import com.example.MakersHub.enums.PostStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name="crafter_id")
    private Crafter crafter;

    private Double amount;

    @Enumerated(EnumType.STRING) //postStatus will be stored as String in db
    private PostStatus postStatus ;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String paymentNote;

}
