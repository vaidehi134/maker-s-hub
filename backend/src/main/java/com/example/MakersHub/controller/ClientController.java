package com.example.MakersHub.controller;

import com.example.MakersHub.dto.*;
import com.example.MakersHub.services.client.ClientService;
import org.apache.coyote.Response;
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
            if(clientId==null){System.out.println("error in clientid");}
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

    @GetMapping("/find-crafter/{postId}")
    public ResponseEntity<?> findCrafter(@PathVariable Long postId)
    {
        if(postId==null){System.out.println("error in clientid");}
        return ResponseEntity.ok(clientService.findCrafter(postId));
    }

    @PostMapping("/accept-crafter")
    public ResponseEntity<?> acceptCrafterRequest(@RequestBody CrafterAssignmentDTO crafterAssignmentDTO)
    {
        boolean success = clientService.acceptCrafterRequest(crafterAssignmentDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/crafter-proposal/{crafterId}/{postId}")
    public ResponseEntity<?> getCrafterProposalById(
            @PathVariable Long crafterId,
            @PathVariable Long postId
    ) {
        if (crafterId == null || postId == null) {
            System.out.println("error in crafterId or postId");
            return ResponseEntity.badRequest().body("Invalid parameters");
        }
        return ResponseEntity.ok(clientService.getCrafterProposalById(crafterId, postId));
    }

      @PostMapping("/cancel-crafter-request/{postId}")
    public ResponseEntity<?> cancelCrafterRequest(@PathVariable Long postId, @RequestBody Long assignedCrafterId )
      {
          if(postId==null){System.out.println("error in postId");}
          boolean success = clientService.cancelCrafterRequest(postId,assignedCrafterId);
          if (success) {
              return ResponseEntity.status(HttpStatus.OK).build();
          } else {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }
      }

       @GetMapping("/get-crafter-by-crafterId/{crafterId}")
    public ResponseEntity<?> getCrafterByCrafterId(@PathVariable Long crafterId)
       {
           if(crafterId==null){System.out.println("error in crafterId");}
           return ResponseEntity.ok(clientService.getCrafterByCrafterId(crafterId));

       }




}
