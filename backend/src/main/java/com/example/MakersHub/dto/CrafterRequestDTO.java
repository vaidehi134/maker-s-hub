//package com.example.MakersHub.dto;
//
//import com.example.MakersHub.entity.Category;
//import com.example.MakersHub.entity.Material;
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//import java.util.List;
//
//public class CrafterRequestDTO {
//
//    @JsonProperty("categories")
//    private List<Category> categories;
//
//    @JsonProperty("materials")
//    private List<Material>materials;
//
//    private String city;
//    private String district;
//    private String state;
//    private String country;
//    private String itemName;
//
//    public String getItemName() {
//        return itemName;
//    }
//
//    public void setName(String itemName) {
//        this.itemName = itemName;
//    }
//
//    //getter-setters
//    public String getDistrict()
//    {
//        return district;
//    }
//
//    public void setDistrict(String district) {
//        this.district = district;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public String getCountry() {
//        return country;
//    }
//
//    public void setCountry(String country) {
//        this.country = country;
//    }
//
//    public String getState() {
//        return state;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//
//    // Getter and Setter for materials
//    public List<Material> getMaterials()
//    {
//        return materials;
//    }
//
//    public void setMaterials(List<Material> materials) {
//        this.materials = materials;
//    }
//
//    public List<Category> getCategories() {
//        return categories;
//    }
//
//    public void setCategories(List<Category> categories) {
//        this.categories = categories;
//    }
//
//
//    @Override
//    public String toString() {
//        return "CrafterRequestDto{" +
//                "categories=" + (categories != null ? categories : "null") +
//                ", materials=" + (materials != null ? materials : "null") +
//                ", city='" + city + '\'' +
//                ", district='" + district + '\'' +
//                ", state='" + state + '\'' +
//                ", country='" + country + '\'' +
//                '}';
//    }
//}

package com.example.MakersHub.dto;

import com.example.MakersHub.entity.Category;
import com.example.MakersHub.entity.Material;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CrafterRequestDTO {

    @JsonProperty("categories")
    private List<Category> categories;

    @JsonProperty("materials")
    private List<Material>materials;

    private Double longitude;
    private Double latitude;
    private String itemName;
    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public String getItemName() {
        return itemName;
    }
    public void setName(String itemName) {
        this.itemName = itemName;
    }
    // Getter and Setter for materials
    public List<Material> getMaterials()
    {
        return materials;
    }

    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }


    @Override
    public String toString() {
        return "CrafterRequestDto{" +
                "categories=" + (categories != null ? categories : "null") +
                ", materials=" + (materials != null ? materials : "null") +
                '}';
    }
}

