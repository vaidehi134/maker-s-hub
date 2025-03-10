//package com.example.MakersHub.dto;
//import com.example.MakersHub.enums.PostStatus;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.example.MakersHub.entity.Category;
//import com.example.MakersHub.entity.Material;
//import lombok.Data;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Data
//public class PostDTO {
//
//    private Long id;
//    private String itemName;
//    private String description;
//    private List<MultipartFile> images; // Handle multiple file uploads
//    private List<String> deletedPublicIds;  //to delete the images from cloudinary while updating the post by client
//    private List<PostImage> imageDetails; // For existing images
//    private Long clientId;
//    private String clientName;
//    private LocalDate initiationDate; // Start date of the project
//    private LocalDate completionDate;  // Deadline for completion
//
//    @JsonProperty("categories")
//    private List<Category> categories;
//
//    @JsonProperty("materials")
//    private List<Material>materials;
//    private String city;
//    private String district;  // Optional
//    private String state;
//    private String country;
//    private PostStatus postStatus; // Default value
//    private  Long assignedCrafterId;
//    private List<Long> postAcceptingCrafterId;   //to keep track of crafter who has accepted the post request
//
//    public List<Long> getPostAcceptingCrafterId() {
//        return postAcceptingCrafterId;
//    }
//    public void setPostAcceptingCrafterId(List<Long> postAcceptingCrafterId) {
//        this.postAcceptingCrafterId = postAcceptingCrafterId;
//    }
//    public Long getAssignedCrafterId() {
//        return assignedCrafterId;
//    }
//    public void setAssignedCrafterId(Long assignedCrafterId) {
//        this.assignedCrafterId = assignedCrafterId;
//    }
//    public PostStatus getPostStatus() {
//        return postStatus;
//    }
//    public void setPostStatus(PostStatus postStatus) {
//        if (postStatus == null) {
//            throw new IllegalArgumentException("Post status cannot be null.");
//        }
//        this.postStatus = postStatus;
//    }
//    public List<String> getDeletedPublicIds() {
//        return deletedPublicIds;
//    }
//    public void setDeletedPublicIds(List<String> deletedPublicIds) {
//        this.deletedPublicIds = deletedPublicIds;
//    }
//    public List<PostImage> getImageDetails() {
//        return imageDetails;
//    }
//    public void setImageDetails(List<PostImage> imageDetails) {
//        this.imageDetails = imageDetails;
//    }
//    public String getDistrict() {
//        return district;
//    }
//    public void setDistrict(String district) {
//        this.district = district;
//    }
//    public String getCity() {
//        return city;
//    }
//    public void setCity(String city) {
//        this.city = city;
//    }
//    public String getCountry() {
//        return country;
//    }
//    public void setCountry(String country) {
//        this.country = country;
//    }
//    public String getState() {
//        return state;
//    }
//    public void setState(String state) {
//        this.state = state;
//    }
//   public List<Material> getMaterials()
//   {
//        return materials;
//    }
//   public void setMaterials(List<Material> materials) {
//        this.materials = materials;
//    }
//    public List<Category> getCategories() {
//       return categories;
//  }
//   public void setCategories(List<Category> categories) {
//       this.categories = categories;
//   }
//    public LocalDate getInitiationDate() {
//        return initiationDate;
//    }
//    public void setInitiationDate(LocalDate initiationDate) {
//        this.initiationDate = initiationDate;
//    }
//    public LocalDate getCompletionDate() {
//        return completionDate;
//    }
//    public void setCompletionDate(LocalDate completionDate) {
//        this.completionDate = completionDate;
//    }
//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//    public String getItemName() {
//        return itemName;
//    }
//    public void setItemName(String itemName) {
//        this.itemName = itemName;
//    }
//    public String getDescription() {
//        return description;
//    }
//    public void setDescription(String description) {
//        this.description = description;
//    }
//    public List<MultipartFile> getImages() {
//        return images;
//    }
//    public void setImages(List<MultipartFile> images) {
//        this.images = images;
//    }
//    public Long getClientId() {
//        return clientId;
//    }
//    public void setClientId(Long clientId) {
//        this.clientId = clientId;
//    }
//    public String getClientName() {
//        return clientName;
//    }
//    public void setClientName(String clientName) {
//        this.clientName = clientName;
//    }
//
//    // toString Method
//    @Override
//    public String toString() {
//        return "PostDTO{" +
//                "id=" + id +
//                ", itemName='" + itemName + '\'' +
//                ", description='" + description + '\'' +
//                ", images=" + (images != null ? images.size() + " files" : "null") +
//                ", ImageUrls=" + (imageDetails != null ? imageDetails.size() + " images" : "null") +
//                ", clientId=" + clientId +
//                ", clientName='" + clientName + '\'' +
//                '}';
//    }
//}

package com.example.MakersHub.dto;
import com.example.MakersHub.enums.PostStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.MakersHub.entity.Category;
import com.example.MakersHub.entity.Material;
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
    private List<String> deletedPublicIds;  //to delete the images from cloudinary while updating the post by client
    private List<PostImage> imageDetails; // For existing images
    private Long clientId;
    private String clientName;
    private LocalDate completionDate;  // Deadline for completion

    @JsonProperty("categories")
    private List<Category> categories;


    @JsonProperty("materials")
    private List<Material>materials;
    private PostStatus postStatus; // Default value
    private  Long assignedCrafterId;
    private List<Long> postAcceptingCrafterId;   //to keep track of crafter who has accepted the post request
    private Double latitude;
    private Double longitude;
    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }



    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public List<Long> getPostAcceptingCrafterId() {
        return postAcceptingCrafterId;
    }
    public void setPostAcceptingCrafterId(List<Long> postAcceptingCrafterId) {
        this.postAcceptingCrafterId = postAcceptingCrafterId;
    }
    public Long getAssignedCrafterId() {
        return assignedCrafterId;
    }
    public void setAssignedCrafterId(Long assignedCrafterId) {
        this.assignedCrafterId = assignedCrafterId;
    }
    public PostStatus getPostStatus() {
        return postStatus;
    }
    public void setPostStatus(PostStatus postStatus) {
        if (postStatus == null) {
            throw new IllegalArgumentException("Post status cannot be null.");
        }
        this.postStatus = postStatus;
    }
    public List<String> getDeletedPublicIds() {
        return deletedPublicIds;
    }
    public void setDeletedPublicIds(List<String> deletedPublicIds) {
        this.deletedPublicIds = deletedPublicIds;
    }
    public List<PostImage> getImageDetails() {
        return imageDetails;
    }
    public void setImageDetails(List<PostImage> imageDetails) {
        this.imageDetails = imageDetails;
    }
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
    public LocalDate getCompletionDate() {
        return completionDate;
    }
    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getItemName() {
        return itemName;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public List<MultipartFile> getImages() {
        return images;
    }
    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
    public Long getClientId() {
        return clientId;
    }
    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
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
                ", ImageUrls=" + (imageDetails != null ? imageDetails.size() + " images" : "null") +
                ", clientId=" + clientId +
                ", clientName='" + clientName + '\'' +
                '}';
    }
}

