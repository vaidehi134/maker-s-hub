package com.example.MakersHub.services.client;

import com.example.MakersHub.dto.PostDTO;

import java.io.IOException;
import java.util.List;


public interface ClientService {
    boolean postPost(long userId, PostDTO postDTO) throws IOException;
      List<PostDTO> getAllPosts(Long userId);
      PostDTO getPostById(Long postId);
    boolean updatePost(Long postId, PostDTO postDTO) throws IOException;
    boolean deletePost(Long postId);
}
