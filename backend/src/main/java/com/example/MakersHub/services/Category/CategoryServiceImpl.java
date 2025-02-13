package com.example.MakersHub.services.Category;

import com.example.MakersHub.dto.CategoryDTO;
import com.example.MakersHub.entity.Category;
import com.example.MakersHub.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    // Fetch all categories
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
            System.out.println("-------------------------------------Categories name");
        List<String> categoryNames = categories.stream()
                .map(Category::getName) // Map each Category to its name
                .collect(Collectors.toList()); // Collect the names into a list

// Now print the category names
        for (String name : categoryNames) {
            System.out.println(name);
        }

        return categories.stream()
                .map(Category::getDto)
                .collect(Collectors.toList());
    }
}