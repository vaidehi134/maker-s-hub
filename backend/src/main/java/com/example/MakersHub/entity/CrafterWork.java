package com.example.MakersHub.entity;

import com.example.MakersHub.dto.PostImage;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Data
@Table(name = "crafter_work")
public class CrafterWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "post_id", unique = true, nullable = false)
    private Post post;

    //crafter can  upload many crafterWork
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "crafter_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Crafter crafter;

    private String comment;

    @ElementCollection
    @CollectionTable(name = "crafter_work_images", joinColumns = @JoinColumn(name = "crafter_work_id"))
    private List<PostImage> imageDetails;

    @Column(nullable = true) // Allow rating to be null initially...
    private Double rating;

    @Column(nullable = true , length = 500)
    private String clientFeedback;

}