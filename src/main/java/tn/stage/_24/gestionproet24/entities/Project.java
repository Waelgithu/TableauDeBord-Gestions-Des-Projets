package tn.stage._24.gestionproet24.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private int priority;
    private String type;
    private float budget;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    /*@JsonManagedReference*/
    private Set<Task> tasks;

    @ManyToMany(mappedBy = "projects", cascade = CascadeType.ALL)
    /*@JsonManagedReference*/
    /*@JsonIgnoreProperties*/
    private Set<User> users;
}
