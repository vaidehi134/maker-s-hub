//package com.example.MakersHub.entity;
//
//import com.example.MakersHub.dto.PostDTO;
//import com.example.MakersHub.dto.PostImage;
//import com.example.MakersHub.enums.PostStatus;
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.OnDelete;
//import org.hibernate.annotations.OnDeleteAction;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Entity
//@Table(name = "post")
//@Data
//public class Post {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String itemName;
//    private String  description;
//
//    @ElementCollection
//    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
//    private List<PostImage> imageDetails;
//
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "client_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Client client;
//
//    private LocalDate initiationDate;
//    private LocalDate completionDate;
//
//    @ManyToMany
//    @JoinTable(
//            name = "post_categories",
//            joinColumns = @JoinColumn(name = "post_id"),
//            inverseJoinColumns = @JoinColumn(name = "category_id")
//    )
//    private List<Category> categories;
//
//    @ManyToMany
//    @JoinTable(
//            name = "post_materials",
//            joinColumns = @JoinColumn(name = "post_id"),
//            inverseJoinColumns = @JoinColumn(name = "material_id")
//    )
//    private List<Material> materials;
//
//    private String city;
//    private String district;
//    private String state;
//    private String country;
//
//    @Enumerated(EnumType.STRING) //postStatus will be stored as String in db
//    private PostStatus postStatus = PostStatus.PENDING; // Default status
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "assigned_crafter_id")
//    private Crafter assignedCrafter;
//
//
//    public Crafter getAssignedCrafter() {
//        return assignedCrafter;
//    }
//
//    public void setAssignedCrafter(Crafter assignedCrafter) {
//        this.assignedCrafter = assignedCrafter;
//    }
//
//
//    public PostStatus getPostStatus()
//    {
//        return postStatus;
//    }
//    public void setPostStatus(String status) {
//        try {
//            this.postStatus = PostStatus.valueOf(status.toUpperCase());
//        } catch (IllegalArgumentException e) {
//            throw new IllegalArgumentException("Invalid post status: " + status);
//        }
//    }
//
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
//    public List<Material> getMaterials() {
//        return materials;
//    }
//    public void setMaterials(List<Material> materials) {
//        this.materials = materials;
//    }
//    public List<PostImage> getImageDetails() {
//        return imageDetails;
//    }
//    public void setImageDetails(List<PostImage> imageDetails) {
//        this.imageDetails = imageDetails;
//    }
//    public List<Category> getCategories() {
//        return categories;
//    }
//    public void setCategories(List<Category> categories) {
//        this.categories = categories;
//    }
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
//    public Client getClient() {
//        return client;
//    }
//    public void setClient(Client client) {
//        this.client = client;
//    }
//
//
//
//    public PostDTO getPostDto() {
//        PostDTO postDTO = new PostDTO();
//        postDTO.setId(id);
//        postDTO.setItemName(itemName);
//        postDTO.setDescription(description);
//        postDTO.setClientName(client.getName());
//        postDTO.setClientId(client.getId());
//         postDTO.setImageDetails(imageDetails);
//        postDTO.setInitiationDate(initiationDate);
//        postDTO.setCompletionDate(completionDate);
//        postDTO.setCategories(categories);
//          postDTO.setMaterials(materials);
//          postDTO.setCity(city);
//          postDTO.setDistrict(district);
//          postDTO.setState(state);
//          postDTO.setCountry(country);
//          postDTO.setPostStatus(postStatus);
//        // Null check for assignedCrafter
//        postDTO.setAssignedCrafterId(assignedCrafter != null ? assignedCrafter.getId() : null);
//        return postDTO;
//    }
//}


package com.example.MakersHub.entity;

import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.dto.PostImage;
import com.example.MakersHub.enums.PostStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "post")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;

    @Column(length = 255) // Increase this if needed
    private String description;

    @ElementCollection
    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
    private List<PostImage> imageDetails;

//one client can do many posts
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Client client;

//    private LocalDate initiationDate;
    private LocalDate completionDate;

    @ManyToMany
    @JoinTable(
            name = "post_categories",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    @ManyToMany
    @JoinTable(
            name = "post_materials",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materials;

    @Enumerated(EnumType.STRING) //postStatus will be stored as String in db
    private PostStatus postStatus = PostStatus.PENDING; // Default status

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_crafter_id")
    private Crafter assignedCrafter;
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
    public Crafter getAssignedCrafter() {
        return assignedCrafter;
    }

    public void setAssignedCrafter(Crafter assignedCrafter) {
        this.assignedCrafter = assignedCrafter;
    }


    public PostStatus getPostStatus()
    {
        return postStatus;
    }
    public void setPostStatus(String status) {
        try {
            this.postStatus = PostStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid post status: " + status);
        }
    }

    public List<Material> getMaterials() {
        return materials;
    }
    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }
    public List<PostImage> getImageDetails() {
        return imageDetails;
    }
    public void setImageDetails(List<PostImage> imageDetails) {
        this.imageDetails = imageDetails;
    }
    public List<Category> getCategories() {
        return categories;
    }
    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
//    public LocalDate getInitiationDate() {
//        return initiationDate;
//    }
//    public void setInitiationDate(LocalDate initiationDate) {
//        this.initiationDate = initiationDate;
//    }
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
    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }



    public PostDTO getPostDto() {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(id);
        postDTO.setItemName(itemName);
        postDTO.setDescription(description);
        postDTO.setClientName(client.getName());
        postDTO.setClientId(client.getId());
        postDTO.setImageDetails(imageDetails);
//        postDTO.setInitiationDate(initiationDate);
        postDTO.setCompletionDate(completionDate);
        postDTO.setCategories(categories);
        postDTO.setMaterials(materials);
        postDTO.setPostStatus(postStatus);
        // Null check for assignedCrafter
        postDTO.setAssignedCrafterId(assignedCrafter != null ? assignedCrafter.getId() : null);
        return postDTO;
    }
}
