package com.example.MakersHub.controller;
import com.example.MakersHub.dto.*;
import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.repository.ClientRepository;
import com.example.MakersHub.repository.CrafterRepository;
import com.example.MakersHub.services.authentication.AuthService;
import com.example.MakersHub.services.jwt.UserDetailsServiceImpl;
import com.example.MakersHub.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CrafterRepository crafterRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public static final String TOKEN_PREFIX = "Bearer";

    public static final String HEADER_STRING = "Authorization";

    //The ResponseEntity<?> is a Spring Framework class that represents the HTTP response,
    // including the status code, headers, and body, in a REST API.
    //The wildcard (?) means the type of the response body is unknown or can be of any type.
    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody ClientDTO clientSignupDTO) {

        System.out.println("---------------------------------------------------------------" + clientSignupDTO.getName());
        System.out.println(clientSignupDTO.getLastname());

        if (authService.presentByEmailClient(clientSignupDTO.getEmail())) {
            return new ResponseEntity<>("Client already exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }

        ClientDTO createdUser = authService.signUpClient(clientSignupDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/crafter/sign-up")
    public ResponseEntity<?> signupCrafter(@RequestBody CrafterDTO crafterDTO) {
        System.out.println("---------------------------------------------------------------" + crafterDTO.getName());
        System.out.println(crafterDTO.getLastname());
        System.out.println(crafterDTO.getPhone());
        System.out.println(crafterDTO.getSkills());
        System.out.println(crafterDTO.getCity());

        if (authService.presentByEmailCrafter(crafterDTO.getEmail())) {
            return new ResponseEntity<>("Crafter already exsist with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        CrafterDTO createdUser = authService.signUpCrafter(crafterDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }





    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException {
        System.out.println("Received AuthenticationRequest: " + authenticationRequest);

        try {
            System.out.println("Attempting authentication for: " + authenticationRequest.getUsername());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
            System.out.println("Authentication successful");
        } catch (BadCredentialsException e) {
            System.err.println("Authentication failed for: " + authenticationRequest.getUsername());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Incorrect username or password");
            return;
        }

        UserDetails userDetails = null;
        Long userId = null;
        String role = authenticationRequest.getRole(); // Capture the role from the request

        if ("CLIENT".equalsIgnoreCase(role)) {
            Optional<Client> clientOptional = Optional.ofNullable(clientRepository.findFirstByEmail(authenticationRequest.getUsername()));
            if (clientOptional.isPresent()) {
                Client client = clientOptional.get();
                userDetails = new org.springframework.security.core.userdetails.User(
                        client.getEmail(),
                        client.getPassword(),
                        new ArrayList<>()
                );
                userId = client.getId();
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Client not found");
                return;
            }
        } else if ("CRAFTER".equalsIgnoreCase(role)) {
            Optional<Crafter> crafterOptional = Optional.ofNullable(crafterRepository.findFirstByEmail(authenticationRequest.getUsername()));
            if (crafterOptional.isPresent()) {
                Crafter crafter = crafterOptional.get();
                userDetails = new org.springframework.security.core.userdetails.User(
                        crafter.getEmail(),
                        crafter.getPassword(),
                        new ArrayList<>()
                );
                userId = crafter.getId();
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Crafter not found");
                return;
            }
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Invalid role");
            return;
        }

        // Generate JWT with role
        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), role);
        System.out.println("Generated JWT: " + jwt);

        response.getWriter().write(new JSONObject()
                .put("userId", userId)
                .put("role", role)
                .toString()
        );

        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
        response.addHeader("Authorization", "Bearer " + jwt);

        System.out.println("Response sent with JWT and headers.");
    }

}






