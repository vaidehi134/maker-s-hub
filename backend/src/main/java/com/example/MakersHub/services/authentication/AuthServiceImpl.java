//Authentication is a package for handling  sign in and login activites

package com.example.MakersHub.services.authentication;


import com.example.MakersHub.dto.ClientDTO;
import com.example.MakersHub.dto.CrafterDTO;
import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.repository.ClientRepository;
import com.example.MakersHub.repository.CrafterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);


    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CrafterRepository crafterRepository;

    public ClientDTO signUpClient(ClientDTO clientSignupDTO) {

            logger.info("Received signup request from client: {}",clientSignupDTO );

        // Validate input
        if (clientSignupDTO == null) {
            throw new IllegalArgumentException("SignupRequestDTO cannot be null.");
        }
        if (clientSignupDTO.getEmail() == null || clientSignupDTO.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are mandatory.");
        }

        // Check for existing email
        if (presentByEmailClient(clientSignupDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

         //Map DTO to entity
       Client client = new Client();
        client.setName(clientSignupDTO.getName());
        client.setLastname(clientSignupDTO.getLastname());
        client.setAddress(clientSignupDTO.getAddress());
        client.setEmail(clientSignupDTO.getEmail());
        client.setPhone(clientSignupDTO.getPhone());
//        client.setCity(clientSignupDTO.getCity());
        client.setLocation(clientSignupDTO.getLocation());
        client.setLatitude(clientSignupDTO.getLatitude());
        client.setLongitude(clientSignupDTO.getLongitude());
        client.setPassword(new BCryptPasswordEncoder().encode(clientSignupDTO.getPassword()));


        // Save and return DTO
        Client savedClient =  clientRepository.save(client);
        return savedClient.getDto();

    }

    public CrafterDTO signUpCrafter(CrafterDTO crafterDTO)
    {

       logger.info("Received signup request from crafter: {}", crafterDTO);
        // Validate input
        if (crafterDTO == null) {
            throw new IllegalArgumentException("SignupRequestDTO cannot be null.");
        }
        if (crafterDTO.getEmail() == null || crafterDTO.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are mandatory.");
        }

        // Check for existing email
        if (presentByEmailCrafter(crafterDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        Crafter crafter = new Crafter();
        crafter.setName(crafterDTO.getName());
        crafter.setLastname(crafterDTO.getLastname());
        crafter.setAddress(crafterDTO.getAddress());
        crafter.setEmail(crafterDTO.getEmail());
        crafter.setPhone(crafterDTO.getPhone());
//        crafter.setCity(crafterDTO.getCity());
        crafter.setLocation(crafterDTO.getLocation());
        crafter.setLatitude(crafterDTO.getLatitude());
        crafter.setLongitude(crafterDTO.getLongitude());
        crafter.setPassword(new BCryptPasswordEncoder().encode(crafterDTO.getPassword()));
        crafter.setSkills(crafterDTO.getSkills());

        Crafter savedCrafter =  crafterRepository.save(crafter);
        return savedCrafter.getDto();

    }

    public Boolean presentByEmailClient(String email){
        return clientRepository.findFirstByEmail(email)!=null;
    }
    public Boolean presentByEmailCrafter(String email){
        return crafterRepository.findFirstByEmail(email)!=null;
    }

}
