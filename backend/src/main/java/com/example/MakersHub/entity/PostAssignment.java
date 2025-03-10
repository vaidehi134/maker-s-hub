package com.example.MakersHub.entity;

import com.example.MakersHub.dto.PostAssignmentDTO;
import com.example.MakersHub.enums.PostStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PostAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //A Crafter can request multiple posts → One Crafter can have many PostAssignment
    @ManyToOne
    @JoinColumn(name = "crafter_id", nullable = false)
    private Crafter crafter;
    //A Post can receive multiple requests from different crafters → One Post can have many postAssignment
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Enumerated(EnumType.STRING) //postStatus will be stored as String in db
    private PostStatus postStatus = PostStatus.PENDING; // Default status

    public PostStatus getPostStatus() {
        return postStatus;
    }
    public void setPostStatus(String status) {
        try {
            this.postStatus = PostStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid post status: " + status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Crafter getCrafter() { return crafter; }
    public void setCrafter(Crafter crafter) { this.crafter = crafter; }
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }


    // Convert Entity to DTO
    public PostAssignmentDTO getDto() {
        PostAssignmentDTO dto = new PostAssignmentDTO();
        dto.setId(this.id);

        // Convert Enum to String
        dto.setPostStatus(this.postStatus != null ? this.postStatus.name() : null);
        dto.setCrafterId(this.crafter != null ? this.crafter.getId() : null);
        dto.setPostId(this.post != null ? this.post.getId() : null);
        return dto;
    }

    @Override
    public String toString() {
        return "PostAssignment{id=" + id + ", status='" + postStatus + "', crafterId=" + (crafter != null ? crafter.getId() : "null") + ", postId=" + (post != null ? post.getId() : "null") + "}";
    }
}
