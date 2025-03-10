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

        List<String> materialNames = materials.stream()
                .map(Material::getName) // Map each Material to its name
                .collect(Collectors.toList()); // Collect the names into a list


        // Convert the list of materials to a list of MaterialDTOs and return it
        return materials.stream()
                .map(Material::getDto)  // Assuming you have a `getDto` method in Material entity
                .collect(Collectors.toList());
    }
}
