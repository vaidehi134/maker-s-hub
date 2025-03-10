package com.example.MakersHub.services.crafter;

import com.example.MakersHub.dto.*;
import com.example.MakersHub.dto.CrafterRequestDTO;

import java.util.List;

public interface CrafterService {

    List<PostDTO> getAllPosts(CrafterRequestDTO crafterRequestDTO);

    PostDTO getPostByPostId(Long postId);

    boolean postProposal(CrafterProposalDTO crafterProposalDTO);
    boolean updateProposal(CrafterProposalDTO crafterProposalDTO);
    boolean deleteProposal(Long crafterProposalId);
    CrafterProposalDTO getCrafterProposal(Long postId,Long crafterId);

    List<PostDTO> getWorkByCrafterId(Long crafterId);
    boolean updatePostStatus(String status,Long postId);

    boolean cancelRequestForPost(Long postId,Long crafterId);
}