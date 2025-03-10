package com.example.MakersHub.services.authentication;

import com.example.MakersHub.dto.ClientDTO;
import com.example.MakersHub.dto.CrafterDTO;

public interface AuthService {

    Boolean presentByEmailCrafter(String email);
    Boolean presentByEmailClient(String email);
    CrafterDTO signUpCrafter(CrafterDTO crafterDTO);
    ClientDTO signUpClient(ClientDTO clientSignupDTO);
}

//In Java interfaces, it is perfectly fine to omit access modifiers(public,private..) for methods because all
// methods in an interface are implicitly public and abstract by default.
