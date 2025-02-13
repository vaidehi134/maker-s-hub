package com.example.MakersHub.services.Material;

import com.example.MakersHub.dto.MaterialDTO;
import com.example.MakersHub.entity.Material;
import com.example.MakersHub.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    // Fetch all materials
    @Override
    public List<MaterialDTO> getAllMaterials() {
        List<Material> materials = materialRepository.findAll();

        // Print all the material names (optional)
        System.out.println("-------------------------------------Materials name");
        List<String> materialNames = materials.stream()
                .map(Material::getName) // Map each Material to its name
                .collect(Collectors.toList()); // Collect the names into a list

        // Now print the material names (for debugging or logging purposes)
        for (String name : materialNames) {
            System.out.println(name);
        }

        // Convert the list of materials to a list of MaterialDTOs and return it
        return materials.stream()
                .map(Material::getDto)  // Assuming you have a `getDto` method in Material entity
                .collect(Collectors.toList());
    }
}
