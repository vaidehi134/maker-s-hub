package com.example.MakersHub.dto;

import jakarta.persistence.Embeddable;

@Embeddable
public class PostImage {
    private String imgUrl;
    private String imgPublicId;

    // Default constructor
    public PostImage() {}

    // Parameterized constructor
    public PostImage(String imgUrl, String imgPublicId) {
        this.imgUrl = imgUrl;
        this.imgPublicId = imgPublicId;
    }

    // Getters and Setters
    public String getImgUrl() { return imgUrl; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }
    public String getImgPublicId() { return imgPublicId; }
    public void setImgPublicId(String imgPublicId) { this.imgPublicId = imgPublicId; }
}