package com.example.MakersHub.dto;


import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.entity.Post;
import com.example.MakersHub.enums.PostStatus;

public class PostAssignmentDTO {
    private Long id;
    private Long crafterId;
    private Long postId;
    private String postStatus;

    public String getPostStatus() {
        return postStatus;
    }

    public void setPostStatus(String postStatus) {
        this.postStatus = postStatus;
    }





    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCrafterId() { return crafterId; }
    public void setCrafterId(Long crafterId) { this.crafterId = crafterId; }
    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }

}
