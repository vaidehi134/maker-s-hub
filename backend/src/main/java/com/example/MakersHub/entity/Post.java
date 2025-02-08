package com.example.MakersHub.entity;


import com.example.MakersHub.dto.PostDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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


//    // Getter and Setter for images
//    public List<byte[]> getImages() {
//        return images;
//    }
//
//    public void setImages(List<byte[]> images) {
//        this.images = images;
//    }

    // Getter and Setter for client
    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public PostDTO getPostDto(){
        PostDTO postDTO = new PostDTO();

        postDTO.setId(id);
        postDTO.setItemName(itemName);
        postDTO.setDescription(description);
        postDTO.setClientName(client.getName());
        postDTO.setImageUrls(imageUrls);

        return postDTO;
    }

}
