package com.example.MakersHub.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.MakersHub.entity.Category;
import com.example.MakersHub.entity.Material;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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
    private LocalDate initiationDate; // Start date of the project
    private LocalDate completionDate;  // Deadline for completion

//    @JsonProperty("categories")
//    private List<CategoryDTO> categories;  // Use CategoryDTO instead of Category
//
//    @JsonProperty("materials")
//    private List<MaterialDTO> materials;  // Use MaterialDTO instead of Material
//
//    // Getter and Setter for materials
//    public List<MaterialDTO> getMaterials()
//    {
//        return materials;
//    }
//
//    public void setMaterials(List<MaterialDTO> materials) {
//        this.materials = materials;
//    }
//
//
//    public List<CategoryDTO> getCategories() {
//        return categories;
//    }
//
//    public void setCategories(List<CategoryDTO> categories) {
//        this.categories = categories;
//    }

//
    @JsonProperty("categories")
    private List<Category> categories;  // Use CategoryDTO instead of Category

    @JsonProperty("materials")
    private List<Material>materials;  // Use MaterialDTO instead of Material

  // Getter and Setter for materials
   public List<Material> getMaterials()
   {
        return materials;
    }

   public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }

    public List<Category> getCategories() {
       return categories;
  }

   public void setCategories(List<Category> categories) {
       this.categories = categories;
   }



    public LocalDate getInitiationDate() {
        return initiationDate;
    }

    public void setInitiationDate(LocalDate initiationDate) {
        this.initiationDate = initiationDate;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }


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
