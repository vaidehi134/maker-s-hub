package com.example.MakersHub.entity;
import com.example.MakersHub.dto.CrafterProposalDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "CrafterProposal")
@Data
public class CrafterProposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double estimatedPrice;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false) // Foreign key to Post
    private Post post;

    @ManyToOne
    @JoinColumn(name = "crafter_id", nullable = false) // Foreign key to Crafter
    private Crafter crafter;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Crafter getCrafter() {
        return crafter;
    }

    public void setCrafter(Crafter crafter) {
        this.crafter = crafter;
    }

    // Convert Entity to DTO
    public CrafterProposalDTO getCrafterProposalDto() {
        CrafterProposalDTO dto = new CrafterProposalDTO();
        dto.setId(this.id);
        dto.setPostId(this.post.getId()); // Storing only Post ID
        dto.setCrafterId(this.crafter.getId()); // Storing only Crafter ID
        dto.setEstimatedPrice(this.estimatedPrice);
        dto.setComment(this.comment);
        return dto;
    }

    @Override
    public String toString() {
        return "CrafterProposal{" +
                "id=" + id +
                ", estimatedPrice=" + estimatedPrice +
                ", comment='" + comment + '\'' +
                ", post=" + (post != null ? post.getId() : "null") +
                ", crafter=" + (crafter != null ? crafter.getId() : "null") +
                '}';
    }



}
