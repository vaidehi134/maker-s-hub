package com.example.MakersHub.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CrafterWorkDTO {
    private Long id;
    private Long crafterId;
    private Long postId;
    private List<MultipartFile> images; // Handle multiple file uploads
    private List<PostImage> imageDetails; // For existing images
    private String comment;
    private Double rating;
    private String clientFeedback;
}
