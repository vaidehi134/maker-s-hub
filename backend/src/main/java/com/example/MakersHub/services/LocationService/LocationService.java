package com.example.MakersHub.services.LocationService;
import org.springframework.http.HttpMethod;
import com.example.MakersHub.dto.LocationDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    public List<LocationDTO> getLocationSuggestions(String query) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://nominatim.openstreetmap.org/search?q={query}&format=json";

        ResponseEntity<List<LocationDTO>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<LocationDTO>>() {},
                query
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody().stream()
                    .limit(10) // Limit to 10 suggestions
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }


}