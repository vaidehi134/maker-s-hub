package com.example.MakersHub.entity;

import com.example.MakersHub.dto.ClientDTO;
import com.example.MakersHub.dto.CrafterDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="Crafter")
@Data    //for getting getters and setters from lombok
public class Crafter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastname;


    private String address;

    private String phone;

    private String skills;
    private String city;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }



    //getter and setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for lastname
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    // Getter and Setter for address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for phone
    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills=skills;
    }


    public CrafterDTO getDto() {
        CrafterDTO crafterDTO = new CrafterDTO();
        crafterDTO.setId(this.id);
        crafterDTO.setEmail(this.email);
        crafterDTO.setName(this.name);
        crafterDTO.setLastname(this.lastname);
        crafterDTO.setPhone(this.phone);
        crafterDTO.setAddress(this.address);
        crafterDTO.setSkills(this.skills);
        return crafterDTO;
    }

}



