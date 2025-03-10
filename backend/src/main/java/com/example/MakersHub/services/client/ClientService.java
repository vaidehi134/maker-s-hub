package com.example.MakersHub.services.client;

import com.example.MakersHub.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;


public interface ClientService {
    boolean postPost(long userId, PostDTO postDTO) throws IOException;
      List<PostDTO> getAllPosts(Long userId);
      PostDTO getPostById(Long postId);
    boolean updatePost(Long postId, PostDTO postDTO) throws IOException;
    boolean deletePost(Long postId);
    List<CrafterDTO> findCrafter(Long postId);
//    boolean acceptCrafterRequest( PostAssignmentDTO postAssignmentDTO);
boolean acceptCrafterRequest(CrafterAssignmentDTO crafterAssignmentDTO);

    CrafterProposalDTO getCrafterProposalById(Long crafterId,Long postId);

    boolean cancelCrafterRequest(Long postId,Long assignedCrafterId);

    CrafterDTO getCrafterByCrafterId(Long crafterId);
}
