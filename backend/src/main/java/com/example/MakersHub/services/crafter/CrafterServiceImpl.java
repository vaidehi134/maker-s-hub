package com.example.MakersHub.services.crafter;

import com.example.MakersHub.dto.CrafterProposalDTO;
import com.example.MakersHub.dto.CrafterRequestDTO;

import com.example.MakersHub.dto.PostAssignmentDTO;
import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.dto.PostImage;
import com.example.MakersHub.entity.*;
import com.example.MakersHub.enums.PostStatus;
import com.example.MakersHub.repository.CrafterProposalRepository;
import com.example.MakersHub.repository.CrafterRepository;
import com.example.MakersHub.repository.PostAssignmentRepository;
import com.example.MakersHub.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CrafterServiceImpl implements CrafterService{


    @Autowired
    private PostAssignmentRepository postAssignmentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CrafterRepository crafterRepository;

    @Autowired
    private CrafterProposalRepository crafterProposalRepository;

    @Override
    public List<PostDTO> getAllPosts(CrafterRequestDTO crafterRequestDto) {
        // Extract category and material IDs, passing null if lists are empty
        List<Long> categoryIds = crafterRequestDto.getCategories() == null || crafterRequestDto.getCategories().isEmpty()
                ? null
                : crafterRequestDto.getCategories().stream()
                .map(category -> category.getId())
                .collect(Collectors.toList());

        List<Long> materialIds = crafterRequestDto.getMaterials() == null || crafterRequestDto.getMaterials().isEmpty()
                ? null
                : crafterRequestDto.getMaterials().stream()
                .map(material -> material.getId())
                .collect(Collectors.toList());

        Double longitude = crafterRequestDto.getLongitude();
        Double latitude = crafterRequestDto.getLatitude();
        String itemName = crafterRequestDto.getItemName().isEmpty() ? null : crafterRequestDto.getItemName();

        List<Post> filteredPosts;

        if( longitude != null && latitude!=null) {
            Double latMin = latitude - 0.09;
            Double latMax = latitude + 0.09;
            Double lonMax = longitude + 0.097;
            Double lonMin = longitude - 0.097;


            System.out.println("longitude : " + longitude);
            System.out.println("latitude : " + latitude);


            // Fetch posts matching the crafter's request
        filteredPosts = postRepository.findPostsByCrafterPreferences(
                    categoryIds,
                    materialIds,
                    itemName,
                    latitude,
                    longitude,
                    latMin,
                    latMax,
                    lonMin,
                    lonMax
            );
        }

        else {
           filteredPosts = postRepository.findPostsByCrafterPreferencesAndWithoutLatLon(
                    categoryIds,
                    materialIds,
                    itemName
            );
        }

        // Collect all post IDs
        List<Long> postIds = filteredPosts.stream()
                .map(Post::getId)
                .collect(Collectors.toList());

        // Fetch all CrafterProposals for these posts
        List<CrafterProposal> proposals = postIds.isEmpty()
                ? Collections.emptyList()
                : crafterProposalRepository.findAllByPostIdIn(postIds);

        // Group proposals by post ID to get list of crafter IDs
        Map<Long, List<Long>> postToCraftersMap = proposals.stream()
                .collect(Collectors.groupingBy(
                        cp -> cp.getPost().getId(),
                        Collectors.mapping(cp -> cp.getCrafter().getId(), Collectors.toList())
                ));

        // Convert Entity to DTO and map postAcceptingCrafterId
        return filteredPosts.stream()
                .map(post -> {
                    PostDTO postDTO = post.getPostDto();
                    List<Long> acceptingCrafters = postToCraftersMap.getOrDefault(post.getId(), Collections.emptyList());
                    postDTO.setPostAcceptingCrafterId(acceptingCrafters);
                    System.out.println("postDTO : " + postDTO);
                    return postDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public PostDTO getPostByPostId(Long postId) {
        System.out.println("-----------------getPostByPostId() called from service");
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(post->{
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setItemName(post.getItemName());
            postDTO.setDescription(post.getDescription());
            postDTO.setImageDetails(post.getImageDetails());
            postDTO.setCategories(post.getCategories());
            postDTO.setMaterials(post.getMaterials());
            postDTO.setCompletionDate(post.getCompletionDate());
            return postDTO;
        }).orElse(null);
    }

    @Override
    @Transactional
    //@Transactional ensures all database operations(postRepository.save(post) and crafterProposalRepository.save(...)
    // in a method succeed or fail together,
    // maintaining data consistency.
    // It automatically rolls back changes if an error occurs, preventing partial updates.
    public boolean postProposal( CrafterProposalDTO crafterProposalDTO) {
         System.out.println("--------------------------------------------postProposal() form CrafterService  got called");
        Optional<Crafter>  optionalCrafter = crafterRepository.findById(crafterProposalDTO.getCrafterId());
        Optional<Post> optionalPost = postRepository.findById(crafterProposalDTO.getPostId());

        if(!optionalCrafter.isPresent() || !optionalPost.isPresent()) return false;

        Crafter crafter = optionalCrafter.get();
        Post post = optionalPost.get();
        post.setPostStatus(String.valueOf(PostStatus.ACCEPTED));
        postRepository.save(post);

        CrafterProposal crafterProposal = new CrafterProposal();
        crafterProposal.setCrafter(crafter);
        crafterProposal.setComment(crafterProposalDTO.getComment());
        crafterProposal.setPost(post);
        crafterProposal.setEstimatedPrice(crafterProposalDTO.getEstimatedPrice());


        crafterProposalRepository.save(crafterProposal);
        return true;
    }

    @Override
    public boolean updateProposal(CrafterProposalDTO crafterProposalDTO) {
       Optional<CrafterProposal> optionalCrafterProposal = crafterProposalRepository.findById(crafterProposalDTO.getId());

        if(!optionalCrafterProposal.isPresent()) return false;
         CrafterProposal crafterProposal = optionalCrafterProposal.get();

       crafterProposal.setComment(crafterProposalDTO.getComment());
        crafterProposal.setEstimatedPrice(crafterProposalDTO.getEstimatedPrice());

        System.out.println("crafterProposal" + crafterProposal);
        crafterProposalRepository.save(crafterProposal);

        return true;
    }

    @Override
    @Transactional
    public boolean deleteProposal(Long crafterProposalId) {
        System.out.println("--------------------------------------------deleteProposal() form CrafterService  got called");
        Optional<CrafterProposal> optionalCrafterProposal = crafterProposalRepository.findById(crafterProposalId);
        if (!optionalCrafterProposal.isPresent()) {
            return false;
        }

        CrafterProposal crafterProposal = optionalCrafterProposal.get();
        crafterProposalRepository.delete(crafterProposal);

        // Check if any proposals remain for the post
        Long postId = crafterProposal.getPost().getId();
        long proposalCount = crafterProposalRepository.countByPostId(postId);

        if (proposalCount == 0) {
            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            post.setPostStatus("PENDING");
            postRepository.save(post);
        }

        return true;
    }

    @Override
    public CrafterProposalDTO getCrafterProposal(Long postId, Long crafterId) {
        System.out.println("--------------------------------------------getCrafterProposal() from CrafterService got called");
        Optional<CrafterProposal> optionalCrafterProposal = crafterProposalRepository.findByPostIdAndCrafterId(postId, crafterId);

        if (optionalCrafterProposal.isPresent()) {
            CrafterProposal crafterProposal = optionalCrafterProposal.get();
            System.out.println("----------------------------crafteProposalId : " + crafterProposal.getId());
            return crafterProposal.getCrafterProposalDto();
        } else {
            System.out.println("No proposal found for the given post ID and crafter ID.");
            return null;
        }
    }

    @Override
    public List<PostDTO> getWorkByCrafterId(Long crafterId) {
        // Fetch all Post entities assigned to the given crafterId
        System.out.println("----------------------------------------CrafterServiceImpl : getWorkByCrafterId()");
        List<Post> posts = postRepository.findByAssignedCrafterId(crafterId);

        // Convert each Post entity to a PostDTO
        List<PostDTO> postDTOs = posts.stream()
                .map(Post::getPostDto)
                .collect(Collectors.toList());

        return postDTOs;
    }

    @Override
    public boolean updatePostStatus(String status,Long postId) {

        Optional<Post> optionalPost = postRepository.findById(postId);
        if(!optionalPost.isPresent())
            return false;

        Post post = optionalPost.get();
        post.setPostStatus(status);
        postRepository.save(post);
       return true;
    }

    @Override
    @Transactional
    public boolean cancelRequestForPost(Long postId, Long crafterId) {

        // Fetch the post and crafter proposal in a single query to avoid separate transactions
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        CrafterProposal proposal = crafterProposalRepository.findByPostIdAndCrafterId(postId, crafterId)
                .orElseThrow(() -> new EntityNotFoundException("Crafter proposal not found"));

        // Delete the crafter proposal
        crafterProposalRepository.delete(proposal);

        // Check if there are no other proposals for this post
        boolean hasOtherProposals = crafterProposalRepository.existsByPostId(postId);

        // If no other proposals, update the post status and clear assigned crafter
        if (!hasOtherProposals) {
            post.setPostStatus("PENDING");

        }
        else{
            post.setPostStatus("ACCEPTED");
        }
        post.setAssignedCrafter(null);
        postRepository.save(post);
        return true;
    }
}