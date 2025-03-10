package com.example.MakersHub.entity;

import com.example.MakersHub.dto.ClientDTO;
import com.example.MakersHub.dto.CrafterDTO;
import com.example.MakersHub.dto.PostDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "assignedCrafter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> assignedPosts=new ArrayList<>(); // Initialize to an empty list
//orphanRemoval = true: This means that if you remove a Post from the assignedPosts
// collection of a Crafter, the Post entity will be deleted from the database. This is useful
// to ensure that there are no "orphaned" posts that are no longer associated with any crafter.

    public List<Post> getAssignedPosts() {
        return assignedPosts;
    }
    public void setAssignedPosts(List<Post> assignedPosts) {
        this.assignedPosts = assignedPosts;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
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
        crafterDTO.setCity(this.city);
        // Convert assignedPosts to PostDTO list
        if (this.assignedPosts != null && !this.assignedPosts.isEmpty()) {
            List<PostDTO> postDTOs = this.assignedPosts.stream()
                    .map(post -> post.getPostDto())
                    .collect(Collectors.toList());
            crafterDTO.setAssignedPosts(postDTOs);
        } else {
            crafterDTO.setAssignedPosts(new ArrayList<>()); // Set to an empty list if no posts are assigned
        }

        //why do i need to do this -> visit: C:\Users\Dell\Desktop\sem 6 project\Makers hubbackend\CrafterDTO post member.doc
        return crafterDTO;
    }

}




