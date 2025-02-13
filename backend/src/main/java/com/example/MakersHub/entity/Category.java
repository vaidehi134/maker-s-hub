package com.example.MakersHub.entity;


import com.example.MakersHub.dto.CategoryDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories")  // The table where categories are stored
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique identifier for each category
    private String name;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryDTO getDto() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(this.id);
        categoryDTO.setName(this.name);
        categoryDTO.setDescription(this.description);
        return categoryDTO;
    }
}


