package com.example.MakersHub.controller;


import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.services.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;


    @PostMapping("/post/{userId}")
    public ResponseEntity<?> postPost(@PathVariable Long userId, @ModelAttribute PostDTO postDTO) throws IOException {   //here we are using @ModelAttribute instead of @RequestBody because we want to get Multipath file in request object which is image

          System.out.println("------------------------------------------------postdto : "+postDTO);

          boolean success = clientService.postPost(userId,postDTO);
            if(success)
            {
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
    }


}
