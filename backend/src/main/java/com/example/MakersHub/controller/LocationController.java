package com.example.MakersHub.controller;

import com.example.MakersHub.dto.LocationDTO;
import com.example.MakersHub.services.LocationService.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/location-suggestions")
@RestController
public class LocationController {

    @Autowired
    LocationService locationService;

    @GetMapping
    public List<LocationDTO> getLocationSuggestions(@RequestParam String query) {
        return locationService.getLocationSuggestions(query);
    }
}
