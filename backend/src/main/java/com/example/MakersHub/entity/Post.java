package com.example.MakersHub.entity;


import com.example.MakersHub.dto.PostDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "post")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private String  description;

    @Lob
    @Column(columnDefinition = "LONGBLOB") // Use LONGBLOB for large binary data
    private byte[] img;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)  //so one user can create many post
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

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
    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    // Getter and Setter for user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PostDTO getPostDto(){
        PostDTO postDTO = new PostDTO();

        postDTO.setId(id);
        postDTO.setItemName(itemName);
        postDTO.setDescription(description);
        postDTO.setClientName(user.getName());
        postDTO.setReturnedImg(img);

        return postDTO;
    }

}
