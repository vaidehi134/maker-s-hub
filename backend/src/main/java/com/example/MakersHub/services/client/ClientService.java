package com.example.MakersHub.services.client;

import com.example.MakersHub.dto.PostDTO;

import java.io.IOException;


public interface ClientService {
    boolean postPost(long userId, PostDTO postDTO) throws IOException;
}
