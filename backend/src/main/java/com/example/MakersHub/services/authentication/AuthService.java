package com.example.MakersHub.services.authentication;

import com.example.MakersHub.dto.SignupRequestDTO;
import com.example.MakersHub.dto.UserDto;

public interface AuthService {

    UserDto signUpClient(SignupRequestDTO signupRequestDTO);
    Boolean presentByEmail(String email);
    UserDto signUpCrafter(SignupRequestDTO signupRequestDTO);
}

//In Java interfaces, it is perfectly fine to omit access modifiers(public,private..) for methods because all
// methods in an interface are implicitly public and abstract by default.
