package com.example.MakersHub.controller;


import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.services.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;


//    @PostMapping("/post/{clientId}")                 //changed userId to clientId
//    public ResponseEntity<?> postPost(@PathVariable Long clientId, @ModelAttribute PostDTO postDTO) throws IOException {   //here we are using @ModelAttribute instead of @RequestBody because we want to get Multipath file in request object which is image
//
//          System.out.println("------------------------------------------------postdto : "+postDTO);
//
//        // Process the images
//        List<MultipartFile> images = postDTO.getImages();
//        if (images != null && !images.isEmpty()) {
//            for (MultipartFile image : images) {
//                if (!image.isEmpty()) {
//                    // Example: Convert image to bytes and process/save it
//                    byte[] imageBytes = image.getBytes();
//                    System.out.println("Processing image of size: " + imageBytes.length);
//
//                }
//            }
//        } else {
//            System.out.println("No images uploaded.");
//        }
//
//          boolean success = clientService.postPost(clientId,postDTO);
//            if(success)
//            {
//                return ResponseEntity.status(HttpStatus.OK).build();
//            }
//            else{
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//            }
//    }
//
//    @GetMapping("/posts/{clientId}")
//    public ResponseEntity<?> getAllPostByUserId(@PathVariable Long clientId)
//    {
//        return  ResponseEntity.ok(clientService.getAllPosts(clientId));
//    }
//
//
//    @PostMapping("/postById")
//    public ResponseEntity<?> getPostById(@RequestBody Map<String, Long> requestBody) {
//        // Extract the postId from the request body
//        Long postId = requestBody.get("postId");
//
//        // Check if postId is present
//        if (postId == null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post ID is required");
//        }
//
//        // Fetch the post using the service method
//        PostDTO postDTO = clientService.getPostById(postId);
//
//        // Log image data for debugging
//        System.out.println("....................................images from console : " + postDTO.getImages());
//
//        // Return appropriate response based on whether postDTO is found or not
//        if (postDTO != null) {
//            return ResponseEntity.ok(postDTO);  // Return post data with HTTP 200 status
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 if not found
//        }
//    }


        @PostMapping("/post/{clientId}")
        public ResponseEntity<?> postPost(@PathVariable Long clientId, @ModelAttribute PostDTO postDTO) throws IOException {
            boolean success = clientService.postPost(clientId, postDTO);
            if (success) {
                return ResponseEntity.ok("Post created successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found.");
            }
        }

        @GetMapping("/posts/{clientId}")
        public ResponseEntity<?> getAllPosts(@PathVariable Long clientId) {
            return ResponseEntity.ok(clientService.getAllPosts(clientId));
        }

        @PostMapping("/postById")
        public ResponseEntity<?> getPostById(@RequestBody Map<String, Long> requestBody) {
            Long postId = requestBody.get("postId");
            if (postId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post ID is required");
            }
            PostDTO postDTO = clientService.getPostById(postId);
            return postDTO != null ? ResponseEntity.ok(postDTO) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }




    @PutMapping("/post/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable Long postId, @ModelAttribute PostDTO postDTO) throws IOException {
        boolean success = clientService.updatePost(postId, postDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId)
    {
        boolean success = clientService.deletePost(postId);
        if(success)
        {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
