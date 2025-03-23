package com.example.MakersHub.controller;
import com.example.MakersHub.dto.CrafterProposalDTO;
import com.example.MakersHub.dto.CrafterRequestDTO;
import com.example.MakersHub.dto.CrafterWorkDTO;
import com.example.MakersHub.services.crafter.CrafterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crafter")
public class CrafterController {

    @Autowired
    private CrafterService crafterService;

    @PostMapping("/request")
    public ResponseEntity<?> getAllPost(@RequestBody CrafterRequestDTO crafterRequestDto) {
        System.out.println("-----getAllPost() got called");

        return ResponseEntity.ok(crafterService.getAllPosts(crafterRequestDto));
    }

    @GetMapping("/postByPostId/{postId}")
    public ResponseEntity<?> getPostByPostId(@PathVariable Long postId) {
        System.out.println("--------------------------getPostByPostId() called");
        if (postId == null) {
            System.out.println("error in postId");
        }

        return ResponseEntity.ok(crafterService.getPostByPostId(postId));

    }

    @PostMapping("/post-crafter-proposal")
    public ResponseEntity<?> postProposal(@RequestBody CrafterProposalDTO crafterProposalDTO) {
        System.out.println("postProposal : controller");
        boolean success = crafterService.postProposal(crafterProposalDTO);
        if (success) {
            return ResponseEntity.ok("proposal posted successfully");
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("post not found");
    }

    @PostMapping("/update-crafter-proposal")
    public ResponseEntity<?> updateProposal(@RequestBody CrafterProposalDTO crafterProposalDTO) {

        boolean success = crafterService.updateProposal(crafterProposalDTO);
        if (success) {
            return ResponseEntity.ok("proposal posted successfully");
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("post not found");
    }

    @DeleteMapping("/delete-crafter-proposal/{crafterProposalId}")
    public ResponseEntity<?> deleteProposal(@PathVariable Long crafterProposalId) {
        boolean success = crafterService.deleteProposal(crafterProposalId);
        if (success) {
            return ResponseEntity.ok("proposal posted successfully");
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("post not found");
    }

    @GetMapping("/get-crafter-proposal/{postId}")
    //for get request we have to use RequestParam instead of RequestBody ?
    public ResponseEntity<?> getCrafterProposal(@PathVariable Long postId, @RequestParam Long crafterId) {
        System.out.println("--------------------------getCrafterProposal() called");
        if (postId == null) {
            System.out.println("postId is not found");
        }
        return ResponseEntity.ok(crafterService.getCrafterProposal(postId, crafterId));
    }

    @GetMapping("/getWorkByCrafterId/{crafterId}")
    public ResponseEntity<?> getWorkByCrafterId(@PathVariable Long crafterId) {

        System.out.println("--------------------------getWorkByPostId() called");
        if (crafterId == null) {
            System.out.println("error in postId");
        }

        return ResponseEntity.ok(crafterService.getWorkByCrafterId(crafterId));

    }

    @PostMapping("/post-status/{status}")
    public ResponseEntity<?> updatePostStatus(@PathVariable String status, @RequestParam Long postId)
    {
        boolean success = crafterService.updatePostStatus(status , postId);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("cancel-request-for-post/{postId}")
    public ResponseEntity<?> cancelRequestForPost(@PathVariable Long postId, @RequestParam Long crafterId)
    {
        boolean success = crafterService.cancelRequestForPost(Long.valueOf(postId),crafterId);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("upload-crafter-work")
    public ResponseEntity<?>  uploadCrafterWork(@ModelAttribute CrafterWorkDTO crafterWorkDTO)
    {
        boolean success=  crafterService.uploadCrafterWork(crafterWorkDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //get ratings given by client
    @GetMapping("get-client-reviews/{crafterId}/{postId}")
    public ResponseEntity<?> getWorkClientReviews(@PathVariable Long crafterId,@PathVariable Long postId)
    {
        if(crafterId == null || postId == null)
        {
                  System.out.println("crafterId or postId is null");
        }
        return ResponseEntity.ok(crafterService.getWorkClientReviews(crafterId,postId));

    }

}


