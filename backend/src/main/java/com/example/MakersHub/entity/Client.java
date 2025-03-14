package com.example.MakersHub.entity;

import com.example.MakersHub.dto.ClientDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="Client")
@Data    //for getting getters and setters from lombok
public class Client {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String email;
        private String password;
        private String name;
        private String lastname;
        private String address;
        private String phone;
   // private String city;
    private Double latitude;
    private Double longitude;
    private String location;

    public Double getLatitude(){return latitude;}
    public void setLatitude(Double latitude){this.latitude=latitude;}
    public Double getLongitude(){return longitude;}
    public void setLongitude(Double longitude){this.longitude=longitude;}
    public String getLocation(){return location;}
    public void setLocation(String location){this.location=location;}

//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }


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


        public ClientDTO getDto() {
           ClientDTO clientDto = new ClientDTO();
            clientDto.setId(this.id);
            clientDto.setEmail(this.email);
            clientDto.setName(this.name);
            clientDto.setLastname(this.lastname);
            clientDto.setPhone(this.phone);
            clientDto.setAddress(this.address);
            clientDto.setLongitude(this.longitude);
            clientDto.setLocation(this.location);
            clientDto.setLatitude(this.latitude);
           // clientDto.setCity(this.city);
            // Add any other fields here
            return clientDto;
        }


    }


