package com.example.MakersHub.entity;


import com.example.MakersHub.dto.CategoryDTO;
import com.example.MakersHub.dto.MaterialDTO;
import com.example.MakersHub.dto.PostDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
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
    private String  description;

//    @ElementCollection
//    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
//    @Column(name = "img", columnDefinition = "LONGBLOB")
//    private List<byte[]> images; // Store multiple images as binary data

    @ElementCollection
    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "image_url")
    private List<String> imageUrls; // Store image URLs instead of binary data

    @ManyToOne(fetch = FetchType.LAZY, optional = false)  //so one user can create many post
    @JoinColumn(name = "client_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Client client;

    private LocalDate initiationDate;
    private LocalDate completionDate;

    @ManyToMany
    @JoinTable(
            name = "post_categories",  // Join table to store the relationship
            joinColumns = @JoinColumn(name = "post_id"),  // This is for the Post entity
            inverseJoinColumns = @JoinColumn(name = "category_id")  // This is for the Category entity
    )
    private List<Category> categories;

    @ManyToMany
    @JoinTable(
            name = "post_materials",  // Join table to store the relationship
            joinColumns = @JoinColumn(name = "post_id"),  // This is for the Post entity
            inverseJoinColumns = @JoinColumn(name = "material_id")  // This is for the Material entity
    )
    private List<Material> materials;  // Add this field for materials

    // Getter and Setter for materials
    public List<Material> getMaterials() {
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

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and Setter for client
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
        postDTO.setImageUrls(imageUrls);
        postDTO.setInitiationDate(initiationDate);
        postDTO.setCompletionDate(completionDate);

//        // Convert List<Category> to List<CategoryDTO>
//        List<CategoryDTO> categoryDTOs = categories.stream()
//                .map(category -> {
//                    CategoryDTO categoryDTO = new CategoryDTO();
//                    categoryDTO.setId(category.getId());
//                    categoryDTO.setName(category.getName());
//                    categoryDTO.setDescription(category.getDescription());
//                    return categoryDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Convert List<Material> to List<MaterialDTO>
//        List<MaterialDTO> materialDTOs = materials.stream()
//                .map(material -> {
//                    MaterialDTO materialDTO = new MaterialDTO();
//                    materialDTO.setId(material.getId());
//                    materialDTO.setName(material.getName());
//                    materialDTO.setMaterialCategory(material.getMaterialCategory());
//                    return materialDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Set the converted lists to the DTO
//        postDTO.setCategories(categoryDTOs);
//        postDTO.setMaterials(materialDTOs);


        postDTO.setCategories(categories);
          postDTO.setMaterials(materials);
        return postDTO;
    }


}
