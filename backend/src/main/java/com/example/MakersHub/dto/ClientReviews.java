package com.example.MakersHub.dto;


import lombok.Data;

@Data
public class ClientReviews {
    private Long clientId;
    private Long crafterId;
    private Long postId;
    private Double rating;
    private String clientFeedback;
}
