package com.example.MakersHub.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostDTO {

    private Long id;
    private String itemName;
    private String description;
    private List<MultipartFile> images; // Handle multiple file uploads
    // private List<byte[]> returnedImages; // Retrieve multiple images for display
    private List<String> imageUrls;  // Store image URLs instead of byte arrays
    private Long clientId;
    private String clientName;

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for itemName
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    // Getter and Setter for description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and Setter for images
    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }

//    // Getter and Setter for returnedImages
//    public List<byte[]> getReturnedImages() {
//        return returnedImages;
//    }
//
//    public void setReturnedImages(List<byte[]> returnedImages) {
//        this.returnedImages = returnedImages;
//    }

    // Getter and Setter for clientId
    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    // Getter and Setter for clientName
    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    // toString Method
    @Override
    public String toString() {
        return "PostDTO{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", description='" + description + '\'' +
                ", images=" + (images != null ? images.size() + " files" : "null") +
                ", ImageUrls=" + (imageUrls != null ? imageUrls.size() + " images" : "null") +
                ", clientId=" + clientId +
                ", clientName='" + clientName + '\'' +
                '}';
    }
}
