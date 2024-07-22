package tn.stage._24.gestionproet24.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    private java.util.Date startDate;
    private java.util.Date endDate;
    private int priority;

    @ManyToMany(mappedBy = "tasks", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<User> users;


    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "project_Ref")
    /*@JsonBackReference*/
    private Project project;
}
