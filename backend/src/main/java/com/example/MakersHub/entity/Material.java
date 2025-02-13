package com.example.MakersHub.entity;

import com.example.MakersHub.dto.ClientDTO;
import com.example.MakersHub.dto.MaterialDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "materials") // Mapping to the "materials" table
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String materialCategory;

    // Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMaterialCategory() {
        return materialCategory;
    }

    public void setMaterialCategory(String materialCategory) {
        this.materialCategory = materialCategory;
    }

    public MaterialDTO getDto() {
       MaterialDTO materialDTO = new MaterialDTO();
       materialDTO.setId(this.id);
       materialDTO.setMaterialCategory(this.materialCategory);
       materialDTO.setName(this.name);
        return materialDTO;
    }

    @Override
    public String toString() {
        return "Material{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", materialCategories=" + materialCategory +
                '}';
    }
}


