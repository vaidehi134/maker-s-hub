package com.example.MakersHub.services.jwt;

import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.repository.ClientRepository;
import com.example.MakersHub.repository.CrafterRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClientRepository clientRepository;
    private final CrafterRepository crafterRepository;
    private final HttpServletRequest request;

    @Autowired
    public UserDetailsServiceImpl(ClientRepository clientRepository,
                                  CrafterRepository crafterRepository,
                                  HttpServletRequest request) {
        this.clientRepository = clientRepository;
        this.crafterRepository = crafterRepository;
        this.request = request;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        String url = request.getRequestURI(); // Get the current request URL
//
//        if (url.equals("/client/sign-up")) {
//            Client client = clientRepository.findFirstByEmail(email);
//            if (client == null) throw new UsernameNotFoundException("Client not found");
//            return new org.springframework.security.core.userdetails.User(client.getEmail(), client.getPassword(), new ArrayList<>());
//        }
//        else if (url.equals("/crafter/sign-up")) {
//            Crafter crafter = crafterRepository.findFirstByEmail(email);
//            if (crafter == null) throw new UsernameNotFoundException("Crafter not found");
//            return new org.springframework.security.core.userdetails.User(crafter.getEmail(), crafter.getPassword(), new ArrayList<>());
//        }
//
//        throw new UsernameNotFoundException("Invalid path or user not found");


        Client client = clientRepository.findFirstByEmail(email);
        if (client != null) {
            return new org.springframework.security.core.userdetails.User(client.getEmail(), client.getPassword(), new ArrayList<>());
        }

        // Then, try to find the crafter by email
        Crafter crafter = crafterRepository.findFirstByEmail(email);
        if (crafter != null) {
            return new org.springframework.security.core.userdetails.User(crafter.getEmail(), crafter.getPassword(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}

