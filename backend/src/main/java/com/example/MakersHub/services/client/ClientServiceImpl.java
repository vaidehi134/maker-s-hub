package com.example.MakersHub.services.client;

import com.example.MakersHub.dto.PostDTO;
import com.example.MakersHub.entity.Post;
import com.example.MakersHub.entity.User;
import com.example.MakersHub.repository.PostRepository;
import com.example.MakersHub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

     @Autowired
     private UserRepository userRepository;

     @Autowired
     private PostRepository postRepository;

     public boolean postPost(long userId, PostDTO postDTO) throws IOException {
         Optional<User> optionalUser = userRepository.findById(userId);

        // Optional<User> is a container object in Java that may or may not contain a value.
         // It is used to represent the possibility of a null value without explicitly returning
         // null. Instead, it provides methods to handle the potential absence of a value in a
         // more functional and safe way.(to avoid NullPointerException)

         if(optionalUser.isPresent())
         {
               Post post = new Post();
               post.setItemName(postDTO.getItemName());
               post.setDescription(postDTO.getDescription());
               post.setImg(postDTO.getImg().getBytes());
               post.setUser(optionalUser.get());

               postRepository.save(post);
               return true;
         }
               return false;
     }

}
