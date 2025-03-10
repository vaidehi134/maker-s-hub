package com.example.MakersHub.dto;

import lombok.Data;

@Data
public class CrafterProposalDTO {
    private Long id;
    private Long postId;
    private Long crafterId;
    private Double estimatedPrice;
    private String comment;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getCrafterId() {
        return crafterId;
    }

    public void setCrafterId(Long crafterId) {
        this.crafterId = crafterId;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
