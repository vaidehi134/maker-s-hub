package com.example.MakersHub.services.client;
import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Post;
import com.example.MakersHub.repository.ClientRepository;
import com.example.MakersHub.repository.PostRepository;
import com.example.MakersHub.services.cloudinary.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//@Service
//public class ClientServiceImpl implements ClientService {
//
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private ClientRepository clientRepository;
//
//
//    @Override
//    public boolean postPost(long clientId, PostDTO postDTO) throws IOException {
//        Optional<Client> optionalClient = clientRepository.findById(clientId);
//
//        if (!optionalClient.isPresent()) {
//            // Log or return a more descriptive error if the client is not found
//            return false;
//        }
//
//        Client client = optionalClient.get();
//        Post post = new Post();
//        post.setItemName(postDTO.getItemName());
//        post.setDescription(postDTO.getDescription());
//        post.setClient(client);
//
//        // Process multiple images
//        if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
//            List<byte[]> imageList = postDTO.getImages().stream()
//                    .map(image -> {
//                        try {
//                            return image.getBytes(); // Convert MultipartFile to byte[]
//                        } catch (IOException e) {
//                            // Log the error and rethrow a more specific exception
//                            System.err.println("Error processing image: " + image.getOriginalFilename());
//                            throw new RuntimeException("Error processing image: " + image.getOriginalFilename(), e);
//                        }
//                    })
//                    .collect(Collectors.toList());
//            post.setImages(imageList); // Save multiple images
//        }
//
//        postRepository.save(post);
//        return true;
//    }
//
//    @Override
//    public List<PostDTO> getAllPosts(Long clientId) {
//        // Fetch all posts for a client and map them to PostDTOs
//        return postRepository.findAllByClientId(clientId).stream()
//                .map(Post::getPostDto) //converts post to postDTO
//                .collect(Collectors.toList());
//    }
//
//
//
//    @Override
//    public PostDTO getPostById(Long postId) {
//        Optional<Post> optionalPost = postRepository.findById(postId);
//        return optionalPost.map(post -> {
//            PostDTO postDTO = new PostDTO();
//            postDTO.setId(post.getId());
//            postDTO.setItemName(post.getItemName());
//            postDTO.setDescription(post.getDescription());
//            // Instead of directly setting all images, you can stream the images if necessary
//            postDTO.setReturnedImages(post.getImages()); // You can still assign the images as byte[] if needed
//
//            return postDTO;
//        }).orElse(null);
//    }
//
//
//
//
//    @Override
//    public boolean updatePost(Long postId, PostDTO postDTO) throws IOException {
//
//        System.out.println("..............................................updatePost() is called:\n"+postDTO);
//        Optional<Post> optionalPost = postRepository.findById(postId);
//        if (optionalPost.isPresent()) {
//            Post post = optionalPost.get();
//
//            // Update item name (serviceName) and description
//            post.setItemName(postDTO.getItemName());
//            post.setDescription(postDTO.getDescription());
//
//            // Handle multiple images
//            if (postDTO.getImages() != null && !postDTO.getImages().isEmpty()) {
//                // Assuming you want to store multiple images as byte arrays
//                List<byte[]> images = new ArrayList<>();
//                for (MultipartFile img : postDTO.getImages()) {
//                    images.add(img.getBytes());
//                }
//                post.setImages(images);
//            }
//
//            // Save the updated post entity
//            postRepository.save(post);
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    @Override
//    public boolean deletePost(Long postId)
//    {
//        Optional<Post> optionalPost = postRepository.findById(postId);
//        if(optionalPost.isPresent())
//        {
//            postRepository.delete(optionalPost.get());
//            return true;
//        }
//        return false;
//    }
//
//
//
//
//
//}

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CloudinaryService cloudinaryService;  // Inject CloudinaryService

    @Override
    public boolean postPost(long clientId, PostDTO postDTO) throws IOException {
        Optional<Client> optionalClient = clientRepository.findById(clientId);

        if (!optionalClient.isPresent()) {
            return false;
        }

        Client client = optionalClient.get();
        Post post = new Post();
        post.setItemName(postDTO.getItemName());
        post.setDescription(postDTO.getDescription());
        post.setClient(client);

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
        return postRepository.findAllByClientId(clientId).stream()
                .map(post -> {
                    PostDTO postDTO = new PostDTO();
                    postDTO.setId(post.getId());
                    postDTO.setItemName(post.getItemName());
                    postDTO.setDescription(post.getDescription());
                    postDTO.setImageUrls(post.getImageUrls());  // Return image URLs
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
            postDTO.setImageUrls(post.getImageUrls());  // Set image URLs
            return postDTO;
        }).orElse(null);
    }

    @Override
    public boolean updatePost(Long postId, PostDTO postDTO) throws IOException {
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

