package com.example.MakersHub.controller;
import com.example.MakersHub.dto.MaterialDTO;
import com.example.MakersHub.services.Material.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class  MaterialController{

    @Autowired
    private MaterialService materialService;

    // Endpoint to get all categories
    @GetMapping("/material")
    public List<MaterialDTO> getAllMaterials() {
        return materialService.getAllMaterials();
    }
}
