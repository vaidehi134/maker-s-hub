package com.example.MakersHub.dto;

import lombok.Data;

@Data
public class CrafterAssignmentDTO {
    private Long crafterId;
    private Long postId;

    public Long getCrafterId(){return crafterId;}
    public void setCrafterId(Long crafterId){this.crafterId = crafterId;}
    public Long getPostId(){return postId;}
    public void setPostId(Long postId){this.postId = postId;}
}
