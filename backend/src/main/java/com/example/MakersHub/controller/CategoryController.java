package com.example.MakersHub.controller;

import com.example.MakersHub.dto.CategoryDTO;
import com.example.MakersHub.services.Category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Endpoint to get all categories
    @GetMapping("/category")
    public List<CategoryDTO> getAllCategories() {

        System.out.println("....................................................entered in getAAllCategories()");
        return categoryService.getAllCategories();
    }
}
