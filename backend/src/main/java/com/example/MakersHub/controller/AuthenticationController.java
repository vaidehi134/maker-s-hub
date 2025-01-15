package com.example.MakersHub.controller;

import com.example.MakersHub.dto.AuthenticationRequest;
import com.example.MakersHub.entity.User;
import com.example.MakersHub.repository.UserRepository;
import com.example.MakersHub.services.authentication.AuthService;
import com.example.MakersHub.dto.SignupRequestDTO;
import com.example.MakersHub.dto.UserDto;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.Console;
import java.io.IOException;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;


    @Autowired
    private AuthenticationManager authenticationManager;

    public static final String TOKEN_PREFIX = "Bearer";

    public static final String HEADER_STRING = "Authorization";

    //The ResponseEntity<?> is a Spring Framework class that represents the HTTP response,
    // including the status code, headers, and body, in a REST API.
    //The wildcard (?) means the type of the response body is unknown or can be of any type.
    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO) {


        System.out.println("---------------------------------------------------------------" + signupRequestDTO.getName());
        System.out.println(signupRequestDTO.getLastname());

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Client already exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createdUser = authService.signUpClient(signupRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/crafter/sign-up")
    public ResponseEntity<?> signupCrafter(@RequestBody SignupRequestDTO signupRequestDTO) {
        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Crafter already exsist with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createdUser = authService.signUpCrafter(signupRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }


    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException {
  //here in AuthenticationRequest(dto) username(email) and password will get stored

        try {
            //this will check if username and password matches or not
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        User user = userRepository.findFirstByEmail(authenticationRequest.getUsername());

        //token will be included in header so no need to include it in response object
        response.getWriter().write(new JSONObject()
                .put("userId", user.getId())
                .put("role", user.getRole())
                .toString()
        );


        //here we need to expose ours headers as well so our react application can access the header and it can extract the jwt
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization" +
                " X-PINGOTHER, Origin, X-requested-With, Content-Type, Accept, X-Custom-header");


        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }
}






