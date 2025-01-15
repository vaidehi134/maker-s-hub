package com.example.MakersHub.dto;


import com.example.MakersHub.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostDTO {


    private Long id;
    private String itemName;
    private String  description;
    private MultipartFile img;//Used to handle the incoming image upload.
    private byte[] returnedImg; //Used to store or retrieve the image as raw binary data for processing or storage purposes.
    private User user;
    private Long userId;
    private String clientName;

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

    // Getter and Setter for img
    public MultipartFile getImg() {
        return img;
    }

    public void setImg(MultipartFile img) {
        this.img = img;
    }

    // Getter and Setter for returnedImg
    public byte[] getReturnedImg() {
        return returnedImg;
    }

    public void setReturnedImg(byte[] returnedImg) {
        this.returnedImg = returnedImg;
    }

    // Getter and Setter for user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter and Setter for clientName
    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}
