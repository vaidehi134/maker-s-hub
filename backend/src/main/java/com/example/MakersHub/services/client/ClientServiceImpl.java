package com.example.MakersHub.services.client;
import com.example.MakersHub.dto.*;
import com.example.MakersHub.entity.*;
import com.example.MakersHub.enums.PostStatus;
import com.example.MakersHub.repository.*;
import com.example.MakersHub.services.LocationService.LocationService;
import com.example.MakersHub.services.cloudinary.CloudinaryService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {


    @Autowired
    private PostAssignmentRepository postAssignmentRepository;
    @Autowired
    private CrafterRepository crafterRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CrafterProposalRepository crafterProposalRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    private CloudinaryService cloudinaryService;  // Inject CloudinaryService

    @Autowired
    private LocationService locationService;

    @Override
    public boolean postPost(long clientId, PostDTO postDTO) throws IOException {
        long startTime = System.nanoTime(); // Start timing

            System.out.println("postPost() get called...........................");
            Optional<Client> optionalClient = clientRepository.findById(clientId);

            if (!optionalClient.isPresent()) {
                return false; // Early exit, timing still captured
            }

            Client client = optionalClient.get();
            Post post = new Post();
            post.setItemName(postDTO.getItemName());
            post.setDescription(postDTO.getDescription());
            post.setClient(client);
            post.setCategories(postDTO.getCategories());
            post.setCompletionDate(postDTO.getCompletionDate());
            post.setLatitude(postDTO.getLatitude());
            post.setLongitude(postDTO.getLongitude());
            post.setLocation(postDTO.getLocation());


//            if (postDTO.getMaterials() != null) {
//                System.out.println("Materials: " + postDTO.getMaterials());
//            } else {
//                System.out.println("Materials are null");
//            }

            post.setMaterials(postDTO.getMaterials());

            if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
                List<PostImage> imageDetails = new ArrayList<>();
                for (MultipartFile image : postDTO.getImages()) {
                    try {
                        AbstractMap.SimpleEntry<String, String> result = cloudinaryService.uploadImage(image);
                        imageDetails.add(new PostImage(result.getKey(), result.getValue()));
                    } catch (IOException e) {
                        throw new RuntimeException("Image upload failed: " + image.getOriginalFilename(), e);
                    }
                }
                post.setImageDetails(imageDetails);
            }

            postRepository.save(post);
            return true;
    }

    //here we should we use post.getDto()
    @Override
    public List<PostDTO> getAllPosts(Long clientId) {
        System.out.println("------------------------------------getAllPost() of service method got called");
        return postRepository.findAllByClientId(clientId).stream()
                .map(post -> {
                    PostDTO postDTO = new PostDTO();
                    postDTO.setId(post.getId());
                    postDTO.setItemName(post.getItemName());
                    postDTO.setDescription(post.getDescription());
                    postDTO.setImageDetails(post.getImageDetails());  // Return image URLs
                    postDTO.setCompletionDate(post.getCompletionDate());
                    postDTO.setPostStatus(post.getPostStatus());
                    if (post.getAssignedCrafter() != null) {
                        postDTO.setAssignedCrafterId(post.getAssignedCrafter().getId());

                    }
                    return postDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public PostDTO getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(post -> {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setItemName(post.getItemName());
            postDTO.setDescription(post.getDescription());
            postDTO.setImageDetails(post.getImageDetails());
            postDTO.setCategories(post.getCategories());
            postDTO.setMaterials(post.getMaterials());
            postDTO.setCompletionDate(post.getCompletionDate());
            postDTO.setLocation(post.getLocation());
            System.out.println("location : "+postDTO.getLocation());
            return postDTO;
        }).orElse(null);
    }

@Override
public boolean updatePost(Long postId, PostDTO postDTO) throws IOException {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (!optionalPost.isPresent()) {
        return false;
    }

    Post post = optionalPost.get();

    // Delete images from Cloudinary and database
    List<String> deletedPublicIds = postDTO.getDeletedPublicIds();
    if (deletedPublicIds != null && !deletedPublicIds.isEmpty()) {
        for (String publicId : deletedPublicIds) {
            try {
                cloudinaryService.deleteImage(publicId);
            } catch (Exception e) {
                e.printStackTrace(); // Log error but proceed
            }
        }
        // Remove deleted images from the post's imageDetails
        post.setImageDetails(post.getImageDetails().stream()
                .filter(img -> !deletedPublicIds.contains(img.getImgPublicId()))
                .collect(Collectors.toList()));
    }

    // Update other fields
    post.setItemName(postDTO.getItemName());
    post.setDescription(postDTO.getDescription());
//    post.setInitiationDate(postDTO.getInitiationDate());
    post.setCompletionDate(postDTO.getCompletionDate());
    post.setLocation(postDTO.getLocation());
    post.setLatitude(postDTO.getLatitude());
    post.setLongitude(postDTO.getLongitude());
    
    // Update categories and materials
    post.setCategories(postDTO.getCategories());
    post.setMaterials(postDTO.getMaterials());

    // Upload new images
    if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
        List<PostImage> newImages = new ArrayList<>();
        for (MultipartFile image : postDTO.getImages()) {
            try {
                AbstractMap.SimpleEntry<String, String> uploadResult = cloudinaryService.uploadImage(image);
                String imgUrl = uploadResult.getKey();
                String publicId = uploadResult.getValue();
                newImages.add(new PostImage(imgUrl, publicId));
            } catch (IOException e) {
                throw new RuntimeException("Image upload failed: " + image.getOriginalFilename(), e);
            }
        }
        post.getImageDetails().addAll(newImages);
    }

    postRepository.save(post);
    return true;
}


    @Override
    public boolean deletePost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            // Extract public IDs of images associated with the post
            List<String> publicIds = post.getImageDetails().stream()
                    .map(PostImage::getImgPublicId)
                    .collect(Collectors.toList());

            // Delete images from Cloudinary
            publicIds.forEach(publicId -> {
                try {
                    cloudinaryService.deleteImage(publicId);
                } catch (Exception e) {
                    // Log errors but continue deleting other images
                    System.err.println("Failed to delete image with public ID: " + publicId);
                    e.printStackTrace();
                }
            });

            // Delete the post from the database
            postRepository.delete(post);
            return true;
        }
        return false;
    }

//    public List<CrafterDTO> findCrafter(Long postId) {
//        Optional<Post> postOptional = postRepository.findById(postId);
//        if (!postOptional.isPresent()) {
//            return Collections.emptyList();
//        }
//
//        Post post = postOptional.get();
//
//        // Use the correct repository method that returns a list
//        List<CrafterProposal> proposals = crafterProposalRepository.findByPostId(postId);
//
//        Set<Crafter> crafters = proposals.stream()
//                .map(CrafterProposal::getCrafter)
//                .collect(Collectors.toSet());
//
//        List<CrafterDTO> crafterDTOs = crafters.stream()
//                .map(Crafter::getDto)
//                .collect(Collectors.toList());
//
////        crafterDTOs.forEach(crafterDTO -> {
////            System.out.println("Crafter ID: " + crafterDTO.getId());
////            System.out.println("Crafter Name: " + crafterDTO.getName());
////            System.out.println("Crafter Email: " + crafterDTO.getEmail());
////            System.out.println("Crafter Phone: " + crafterDTO.getPhone());
////            System.out.println("Crafter Address: " + crafterDTO.getAddress());
////            System.out.println("Crafter Skills: " + crafterDTO.getSkills());
////            System.out.println("Crafter City: " + crafterDTO.getCity());
////            System.out.println("-------------------------------");
////        });
//
//        return crafterDTOs;
//    }

public List<CrafterDTO> findCrafter(Long postId) {
    Optional<Post> postOptional = postRepository.findById(postId);
    if (!postOptional.isPresent()) {
        return Collections.emptyList();
    }

    Post post = postOptional.get();

    // Use the correct repository method that returns a list
    List<CrafterProposal> proposals = crafterProposalRepository.findByPostId(postId);

    Set<Crafter> crafters = proposals.stream()
            .map(CrafterProposal::getCrafter)
            .collect(Collectors.toSet());

    List<CrafterDTO> crafterDTOs = crafters.stream()
            .map(Crafter::getDto)
            .collect(Collectors.toList());

    System.out.println("find crafter is over ..........");
    System.out.println(crafterDTOs);
    return crafterDTOs;
}

    @Transactional
    @Override
    public boolean acceptCrafterRequest(CrafterAssignmentDTO crafterAssignmentDTO) {
        System.out.println("-------------------------acceptCrafterRequest() called");

        // Fetch Post by ID
        Post post = postRepository.findById(crafterAssignmentDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Fetch Crafter by ID
        Crafter crafter = crafterRepository.findById(crafterAssignmentDTO.getCrafterId())
                .orElseThrow(() -> new RuntimeException("Crafter not found"));

        // Assign Crafter to Post
        post.setAssignedCrafter(crafter);
         post.setPostStatus("ASSIGNED");
        // Ensure assignedPosts list is initialized
        if (crafter.getAssignedPosts() == null) {
            crafter.setAssignedPosts(new ArrayList<>());
        }

        // Add Post to Crafter's assignedPosts if not already present (duplicate won't be added )
        if (!crafter.getAssignedPosts().contains(post)) {
            crafter.getAssignedPosts().add(post);
        }

        // Save both entities
        postRepository.save(post);
        crafterRepository.save(crafter);

        return true;
    }

    @Override
    public CrafterProposalDTO getCrafterProposalById(Long crafterId, Long postId) {
        System.out.println("-------------------------getCrafterProposalById() called");

        // Find proposal by both crafterId and postId
        Optional<CrafterProposal> proposalOptional = crafterProposalRepository.findByPostIdAndCrafterId(postId, crafterId);

        if (!proposalOptional.isPresent()) {
            throw new RuntimeException("No proposal found for crafterId: " + crafterId + " and postId: " + postId);
        }

        CrafterProposal proposal = proposalOptional.get();
        return proposal.getCrafterProposalDto();
    }


    @Override
    @Transactional
    public boolean cancelCrafterRequest(Long postId, Long assignedCrafterId) {
        System.out.println("------------------------cancelCrafterRequest() called");

        Optional<Post> optionalPost = postRepository.findById(postId);
        if (!optionalPost.isPresent()) {
            return false;
        }

        Post post = optionalPost.get();
        post.setAssignedCrafter(null);

        // Check if there are any CrafterProposals for this post
        long proposalCount = crafterProposalRepository.countByPostId(postId);
        if (proposalCount == 0) {
            post.setPostStatus("PENDING");
        }
        else{
            post.setPostStatus("ACCEPTED");
        }

        postRepository.save(post);

        return true;
    }

    @Override
    public CrafterDTO getCrafterByCrafterId(Long crafterId) {
        Optional<Crafter> optionalCrafter = crafterRepository.findById(crafterId);
         if(!optionalCrafter.isPresent())
             throw new RuntimeException("No crafter details found for crafterId: " + crafterId);

         Crafter crafter = optionalCrafter.get();
         CrafterDTO crafterDTO = new CrafterDTO();
         crafterDTO.setName(crafter.getName());
         crafterDTO.setEmail(crafter.getEmail());
         crafterDTO.setAddress(crafter.getAddress());
         crafterDTO.setLastname(crafter.getLastname());
         crafterDTO.setPhone(crafter.getPhone());
         return crafterDTO;
    }
}




