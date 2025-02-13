package com.example.MakersHub.services.client;
import com.example.MakersHub.dto.CategoryDTO;
import com.example.MakersHub.dto.MaterialDTO;
import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.entity.Category;
import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Material;
import com.example.MakersHub.entity.Post;
import com.example.MakersHub.repository.CategoryRepository;
import com.example.MakersHub.repository.ClientRepository;
import com.example.MakersHub.repository.MaterialRepository;
import com.example.MakersHub.repository.PostRepository;
import com.example.MakersHub.services.cloudinary.CloudinaryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    private CloudinaryService cloudinaryService;  // Inject CloudinaryService

    @Override
    public boolean postPost(long clientId, PostDTO postDTO) throws IOException {

        System.out.println("postPost() get called...........................");
        Optional<Client> optionalClient = clientRepository.findById(clientId);

        if (!optionalClient.isPresent()) {
            return false;
        }

        Client client = optionalClient.get();
        Post post = new Post();
        post.setItemName(postDTO.getItemName());
        post.setDescription(postDTO.getDescription());
        post.setClient(client);
        post.setCategories(postDTO.getCategories());
        post.setInitiationDate(postDTO.getInitiationDate());
        post.setCompletionDate(postDTO.getCompletionDate());

        if (postDTO.getMaterials() != null) {
            System.out.println("Materials: " + postDTO.getMaterials());
        } else {
            System.out.println("Materials are null");
        }

        post.setMaterials(postDTO.getMaterials());

        System.out.println("-----------------------------post materials");
        System.out.println(post.getMaterials());


        // Upload images to Cloudinary and store URLs
        if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
            List<String> imageUrls = postDTO.getImages().stream()
                    .map(image -> {
                        try {
                            return cloudinaryService.uploadImage(image); // Upload image and get URL
                        } catch (IOException e) {
                            throw new RuntimeException("Image upload failed: " + image.getOriginalFilename(), e);
                        }
                    })
                    .collect(Collectors.toList());

            post.setImageUrls(imageUrls);
        }

        postRepository.save(post);
        return true;
    }


    @Override
    public List<PostDTO> getAllPosts(Long clientId) {
        System.out.println("------------------------------------getAllPost() of servicec method got called");
        return postRepository.findAllByClientId(clientId).stream()
                .map(post -> {
                    System.out.println("Post ID: " + post.getId());
                    System.out.println("Item Name: " + post.getItemName());
                    System.out.println("Description: " + post.getDescription());
                    System.out.println("Image URLs: " + post.getImageUrls()); // Log image URLs

                    PostDTO postDTO = new PostDTO();
                    postDTO.setId(post.getId());
                    postDTO.setItemName(post.getItemName());
                    postDTO.setDescription(post.getDescription());
                    postDTO.setImageUrls(post.getImageUrls());  // Return image URLs
                    postDTO.setInitiationDate(post.getInitiationDate());
                    postDTO.setCompletionDate(post.getCompletionDate());


                    return postDTO;
                })
                .collect(Collectors.toList());
    }




    @Override
    public PostDTO getPostById(Long postId) {
        System.out.println("-------------------------getPostById() of service called");
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(post -> {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setItemName(post.getItemName());
            postDTO.setDescription(post.getDescription());
            postDTO.setImageUrls(post.getImageUrls());  // Set image URL
//

            //--------------------------------------------------------------------------------------------------
            System.out.println("----------------------------------------------------Image urls");
            postDTO.setCategories(post.getCategories());
            if (post.getCategories() != null) {
                System.out.println("Categories: " + post.getCategories());
            } else {
                System.out.println("Categories are null");
            }

            System.out.println("-----------------------------post categories");
            System.out.println(post.getCategories());

// Check materials
            System.out.println("---------------------------------------------Materials");
            postDTO.setMaterials(post.getMaterials());
            if (post.getMaterials() != null) {
                System.out.println("Materials: " + post.getMaterials());
            } else {
                System.out.println("Materials are null");
            }



// Print initiation and completion dates
            if (post.getInitiationDate() != null) {
                System.out.println("Initiation Date: " + post.getInitiationDate());
            } else {
                System.out.println("Initiation Date is null");
            }
             postDTO.setInitiationDate(post.getInitiationDate());

            if (post.getCompletionDate() != null) {
                System.out.println("Completion Date: " + post.getCompletionDate());
            } else {
                System.out.println("Completion Date is null");
            }
            postDTO.setCompletionDate(post.getCompletionDate());
//---------------------------------------------------------------------------------------------------------

            System.out.println(post.getImageUrls());
            return postDTO;
        }).orElse(null);
    }




    @Override
    public boolean updatePost(Long postId, PostDTO postDTO) throws IOException {

        System.out.println("update post method got called.....................");
        System.out.println(postDTO.getCategories());
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setItemName(postDTO.getItemName());
            post.setDescription(postDTO.getDescription());


            // Upload new images if provided
            if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
                List<String> imageUrls = postDTO.getImages().stream()
                        .map(image -> {
                            try {
                                return cloudinaryService.uploadImage(image); // Upload and get URL
                            } catch (IOException e) {
                                throw new RuntimeException("Image upload failed", e);
                            }
                        })
                        .collect(Collectors.toList());
                post.setImageUrls(imageUrls);
            }

            post.setCategories(postDTO.getCategories());
            post.setMaterials(postDTO.getMaterials());
            post.setInitiationDate(postDTO.getInitiationDate());
            post.setCompletionDate(postDTO.getCompletionDate());


            postRepository.save(post);
            return true;
        }
        return false;
    }


    @Override
    public boolean deletePost(Long postId)
    {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isPresent())
        {
            postRepository.delete(optionalPost.get());
            return true;
        }
        return false;
    }
}

