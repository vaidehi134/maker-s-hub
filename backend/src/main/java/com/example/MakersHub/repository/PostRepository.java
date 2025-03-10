package com.example.MakersHub.repository;

import com.example.MakersHub.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByClientId(Long clientId);

//This query  is a Spring Data JPA Named Query with JPQL (Java Persistence Query Language) syntax.
// It is used to define a custom query for fetching data from the database using Spring Data JPA.

    //AND (:itemName IS NULL OR p.itemName LIKE %:itemName%) :-> This condition checks if itemName is null.
    // If it is not null, it uses the LIKE clause to perform a partial match.
    // The % wildcard allows matching any sequence of characters before and after the search term
//
//    @Query("SELECT p FROM Post p " +
//            "JOIN p.categories c " +
//            "JOIN p.materials m " +
//            "WHERE (:categories IS NULL OR c.id IN :categories) " +
//            "AND (:materials IS NULL OR m.id IN :materials) " +
//            "AND (:itemName IS NULL OR p.itemName LIKE %:itemName%)"
//             )
//    List<Post> findPostsByCrafterPreferences(
//            @Param("categories") List<Long> categoryIds,
//            @Param("materials") List<Long> materialIds,
//            @Param("city") String city,
//            @Param("district") String district,
//            @Param("state") String state,
//            @Param("country") String country,
//            @Param("itemName") String itemName
//    );


//    @Query("SELECT p FROM Post p " +
//            "JOIN p.categories c " +
//            "JOIN p.materials m " +
//            "WHERE (:categories IS NULL OR c.id IN :categories) " +
//            "AND (:materials IS NULL OR m.id IN :materials) " +
//            "AND (:itemName IS NULL OR p.itemName LIKE %:itemName%) " +
//            "AND (:latitude IS NULL OR :longitude IS NULL OR " +
//            "(p.latitude BETWEEN (:latitude - 0.09) AND (:latitude + 0.09)) " +
//            "AND (p.longitude BETWEEN (:longitude - 0.097) AND (:longitude + 0.097)))")

    @Query("SELECT p FROM Post p " +
            "JOIN p.categories c " +
            "JOIN p.materials m " +
            "WHERE (:categories IS NULL OR c.id IN :categories) " +
            "AND (:materials IS NULL OR m.id IN :materials) " +
            "AND (:itemName IS NULL OR p.itemName LIKE %:itemName%) " +
            "AND ((:latitude IS NULL OR :longitude IS NULL) " +
            "     OR (p.latitude BETWEEN :latMin AND :latMax) " +
            "     AND (p.longitude BETWEEN :lonMin AND :lonMax))")
    List<Post> findPostsByCrafterPreferences(
            @Param("categories") List<Long> categoryIds,
            @Param("materials") List<Long> materialIds,
            @Param("itemName") String itemName,
            @Param("longitude") Double longitude,
            @Param("latitude") Double latitude,
            @Param("latMin") Double latMin,
            @Param("latMax") Double latMax,
            @Param("lonMin") Double lonMin,
            @Param("lonMax") Double lonMax
    );

    @Query("SELECT p FROM Post p WHERE p.assignedCrafter.id = :crafterId")
    List<Post> findByAssignedCrafterId(@Param("crafterId") Long crafterId);


    @Query("SELECT p FROM Post p " +
            "JOIN p.categories c " +
            "JOIN p.materials m " +
            "WHERE (:categories IS NULL OR c.id IN :categories) " +
            "AND (:materials IS NULL OR m.id IN :materials) " +
            "AND (:itemName IS NULL OR p.itemName LIKE %:itemName%) " )
    List<Post> findPostsByCrafterPreferencesAndWithoutLatLon( @Param("categories") List<Long> categoryIds,
                                                              @Param("materials") List<Long> materialIds,
                                                              @Param("itemName") String itemName);

    //@Param annotation is used in Spring Data JPA to bind method parameters to named parameters in the query

}
